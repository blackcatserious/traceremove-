use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("PaySettlement11111111111111111111111111111");

#[program]
mod payment_settlement {
    use super::*;

    pub fn settle_payment(ctx: Context<SettlePayment>, amount: u64) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);

        let transfer_accounts = Transfer {
            from: ctx.accounts.source.to_account_info(),
            to: ctx.accounts.destination.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), transfer_accounts);
        token::transfer(cpi_ctx, amount)?;

        let ledger = &mut ctx.accounts.ledger;
        ledger.amount = ledger.amount.checked_add(amount).ok_or(ErrorCode::Overflow)?;
        ledger.last_settlement_slot = Clock::get()?.slot;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SettlePayment<'info> {
    #[account(mut)]
    pub source: Account<'info, TokenAccount>,
    #[account(mut)]
    pub destination: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"ledger", authority.key().as_ref()], bump)]
    pub ledger: Account<'info, SettlementLedger>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct SettlementLedger {
    pub amount: u64,
    pub last_settlement_slot: u64,
}

impl Space for SettlementLedger {
    const INIT_SPACE: usize = 8 + 8;
}

#[error_code]
pub enum ErrorCode {
    #[msg("Amount must be greater than zero")]
    InvalidAmount,
    #[msg("Overflow while updating settlement ledger")]
    Overflow,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ledger_accumulation() {
        let mut ledger = SettlementLedger {
            amount: 10,
            last_settlement_slot: 0,
        };

        ledger.amount = ledger.amount.checked_add(5).unwrap();
        assert_eq!(ledger.amount, 15);
    }
}

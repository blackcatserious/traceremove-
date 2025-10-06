use anchor_lang::prelude::*;

declare_id!("WalletManage1111111111111111111111111111111");

#[program]
mod wallet_management {
    use super::*;

    pub fn initialize_wallet(ctx: Context<InitializeWallet>, owner: Pubkey) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        wallet.owner = owner;
        wallet.balance = 0;
        Ok(())
    }

    pub fn credit_wallet(ctx: Context<UpdateBalance>, amount: u64) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        wallet.balance = wallet
            .balance
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;
        Ok(())
    }

    pub fn debit_wallet(ctx: Context<UpdateBalance>, amount: u64) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        wallet.balance = wallet
            .balance
            .checked_sub(amount)
            .ok_or(ErrorCode::InsufficientFunds)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeWallet<'info> {
    #[account(init, payer = signer, space = 8 + Wallet::INIT_SPACE)]
    pub wallet: Account<'info, Wallet>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateBalance<'info> {
    #[account(mut)]
    pub wallet: Account<'info, Wallet>,
}

#[account]
pub struct Wallet {
    pub owner: Pubkey,
    pub balance: u64,
}

impl Space for Wallet {
    const INIT_SPACE: usize = 32 + 8;
}

#[error_code]
pub enum ErrorCode {
    #[msg("Overflow while updating wallet balance")] // comment
    Overflow,
    #[msg("Insufficient wallet funds")]
    InsufficientFunds,
}

#[cfg(test)]
mod tests {
    use super::*;
    use anchor_lang::prelude::*;

    #[test]
    fn test_wallet_credit_debit() {
        let mut wallet = Wallet {
            owner: Pubkey::default(),
            balance: 10,
        };

        wallet.balance = wallet.balance.checked_add(5).unwrap();
        assert_eq!(wallet.balance, 15);

        wallet.balance = wallet.balance.checked_sub(3).unwrap();
        assert_eq!(wallet.balance, 12);
    }
}

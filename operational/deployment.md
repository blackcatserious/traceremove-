# Deployment Guide

This document outlines the steps to deploy traceremove.com to production on cPanel.

## Pre‑deployment
- Ensure translations for English and French are up to date and stored in language files.
- Generate `sitemap.xml` with both locales (`/en` and `/fr`).
- Verify meta tags, canonical URLs, and `hreflang` attributes are correct.
- Run automated link check and resolve any broken links.

## Packaging
- From the repository root, run `zip -r traceremove.com.zip public/` to create the upload bundle.
- Include `sitemap.xml`, `.htaccess`, and language files in the bundle.

## Upload
- Log in to cPanel and open *File Manager*.
- Upload `traceremove.com.zip` to the document root and extract it.
- Ensure file permissions are `644` for files and `755` for directories.

## HTTP → HTTPS
- In `.htaccess`, enable permanent redirect:
  ```apacheconf
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  ```
- Renew or install SSL certificates via cPanel *SSL/TLS*.

## Post‑deployment
- Visit `https://traceremove.com/` and `https://traceremove.com/fr/` to confirm pages load.
- Submit `sitemap.xml` in Google Search Console.
- Test forms and reCAPTCHA/Turnstile integrations.


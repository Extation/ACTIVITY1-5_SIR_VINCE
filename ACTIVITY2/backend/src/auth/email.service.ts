import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure Gmail SMTP transporter
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'lanesrateam@gmail.com',
        pass: 'azdf xvmf vtok mlvk', // App password
      },
    });

    // Verify transporter configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter configuration error:', error);
      } else {
        console.log('✅ Email server is ready to send messages');
      }
    });
  }

  /**
   * Send password reset email via Gmail SMTP
   */
  async sendPasswordResetEmail(email: string, resetCode: string): Promise<void> {
    console.log('\n📧 ===== SENDING PASSWORD RESET EMAIL =====');
    console.log('To:', email);
    console.log('Reset Code:', resetCode);

    try {
      const mailOptions = {
        from: {
          name: 'Lanesra Note Team',
          address: 'lanesrateam@gmail.com',
        },
        to: email,
        subject: '🔐 Password Reset Code - Lanesra Note',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
                border-radius: 16px;
                padding: 40px;
                text-align: center;
              }
              .content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-top: 20px;
              }
              .code {
                font-size: 48px;
                font-weight: bold;
                letter-spacing: 10px;
                color: #2193b0;
                background: #f0f9ff;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border: 2px dashed #2193b0;
              }
              .title {
                color: white;
                font-size: 28px;
                font-weight: bold;
                margin: 0;
              }
              .warning {
                background: #fef2f2;
                border-left: 4px solid #ef4444;
                padding: 15px;
                margin-top: 20px;
                text-align: left;
                border-radius: 4px;
              }
              .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #64748b;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="title">🔐 Password Reset Request</h1>
              <div class="content">
                <p>Hello,</p>
                <p>You requested to reset your password for your <strong>Lanesra Note</strong> account.</p>
                <p>Your password reset code is:</p>
                <div class="code">${resetCode}</div>
                <p><strong>This code will expire in 15 minutes.</strong></p>
                <p>Enter this code on the password reset page to continue.</p>
                <div class="warning">
                  <strong>⚠️ Security Notice:</strong><br>
                  If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                </div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated email from Lanesra Note. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Lanesra Note. All rights reserved.</p>
            </div>
          </body>
          </html>
        `,
        text: `
Password Reset Request - Lanesra Note

Hello,

You requested to reset your password for your Lanesra Note account.

Your password reset code is: ${resetCode}

This code will expire in 15 minutes.

Enter this code on the password reset page to continue.

Security Notice:
If you didn't request this password reset, please ignore this email. Your password will remain unchanged.

---
This is an automated email from Lanesra Note. Please do not reply to this email.
© ${new Date().getFullYear()} Lanesra Note. All rights reserved.
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      console.log('==========================================\n');
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      console.log('==========================================\n');
      throw new Error('Failed to send password reset email');
    }
  }
}

const otpMailTemp = (otp) => {
  return `
  <div style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, Helvetica, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

       
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.08);">

        
            <tr>
              <td style="padding:30px; text-align:center; background:linear-gradient(135deg,#4a6cf7,#7f53ff); color:#ffffff;">
                <h2 style="margin:0; font-size:22px;">Secure Verification</h2>
                <p style="margin:8px 0 0 0; font-size:13px; opacity:0.9;">
                  One-Time Password (OTP)
                </p>
              </td>
            </tr>

         
            <tr>
              <td style="padding:35px 30px;">

                <p style="margin:0; font-size:15px; color:#444; line-height:1.6;">
                  Hello,<br><br>
                  Use the verification code below to continue securely. This helps us protect your account.
                </p>

                <!-- OTP Box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0;">
                  <tr>
                    <td align="center">
                      <div style="display:inline-block; padding:18px 30px; border:2px dashed #4a6cf7; border-radius:10px; background:#f9faff;">
                        <span style="font-size:32px; font-weight:bold; letter-spacing:6px; color:#222;">
                          ${otp}
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Expiry -->
                <p style="text-align:center; font-size:14px; color:#666;">
                  ⏱ This code expires in <strong>1 minute</strong>
                </p>

                <hr style="border:none; border-top:1px solid #eee; margin:30px 0;">

                
                <p style="font-size:13px; color:#888; text-align:center; line-height:1.6;">
                  Do not share this code with anyone.<br>
                  If you didn’t request this, please ignore this email.
                </p>

              </td>
            </tr>

            <!-- Bottom Footer -->
            <tr>
              <td style="background:#fafbff; padding:20px; text-align:center; font-size:12px; color:#aaa;">
                © 2026 TaskManager<br>
                Secure Authentication System
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `;
};

module.exports = {
  otpMailTemp
};
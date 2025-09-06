// This is a mock service. In a real application, this would use a backend service
// like Resend, SendGrid, or your own email API.

export interface EmailData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  console.log("Sending email to contact@simeondev.com with data:", data);

  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a 90% success rate
      if (Math.random() > 0.1) {
        console.log("Email sent successfully (mock)");
        resolve();
      } else {
        console.error("Failed to send email (mock)");
        reject(new Error("Email service is currently unavailable"));
      }
    }, 1500);
  });
};

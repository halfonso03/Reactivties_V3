using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Resend;

namespace Infrastructure.Email;

public class EmailSender (IResend resend, IConfiguration configuration) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "Confirm your email address";
        var body = $@"
            <p>Hi {user.DisplayName}</p>
            <p>Please confirm your email by clicking the link below</p>
            <p><a href='{confirmationLink}'>Click here to verify</a></p>
            <p>Thanks</p>            
        ";

        await SendEmailASync(email, subject, body);
    }


    public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        var subject = "Rset your password";
        var body = $@"
            <p>Hi {user.DisplayName}</p>
            <p>Please click this link to reset your password.</p>
            <p><a href='{configuration["ClientAppUrl"]}/reset-password?email={email}&code={resetCode}'>
            Click to reset your password.</a></p>
            <p>If you did not request this, you can ignore this email.</p>            
        ";

        await SendEmailASync(email, subject, body);
    }

    public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        throw new NotImplementedException();
    }

    private async Task SendEmailASync(string email, string subject, string body)
    {
        var message = new EmailMessage
        {
            From = "whatever@resend.dev",
            Subject = subject,
            HtmlBody = body,            
        };

        message.To.Add(email);

        Console.WriteLine(message.HtmlBody);


        try
        {
            await resend.EmailSendAsync(message);
        }
        catch (ResendException ex)
        {
            Console.WriteLine(ex.Message);
        }


        // await Task.CompletedTask;
        
    }

}

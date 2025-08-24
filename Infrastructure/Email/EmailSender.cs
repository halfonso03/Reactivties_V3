using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Resend;

namespace Infrastructure.Email;

public class EmailSender (IResend resend) : IEmailSender<User>
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


    public Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        throw new NotImplementedException();
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

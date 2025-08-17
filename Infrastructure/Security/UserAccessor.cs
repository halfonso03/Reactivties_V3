using System;
using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId()) 
                    ?? throw new UnauthorizedAccessException("no user is logged in");
    }

    public string GetUserId()
    {
        return httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? throw new Exception("no user found");
    }
}

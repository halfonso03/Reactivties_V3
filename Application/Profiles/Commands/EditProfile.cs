using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditProfileDto EditProfileDto { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper)
       : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            var userFromDb = await context.Users.FirstAsync(x => x.Id == user.Id);
            
            mapper.Map(request.EditProfileDto, userFromDb);
           
           
           try
           {
                await context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);                            
           }
           catch (System.Exception)
           {
                // throw;
           }
           
           return Result<Unit>.Failure("Problem updating profile", 400);
        }
    }
}

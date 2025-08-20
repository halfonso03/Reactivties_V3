using System;
using System.Security.Cryptography.X509Certificates;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostDisplayedName, o =>
                o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(d => d.HostId, o =>
                o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(x => x.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(x => x.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(x => x.Id, o => o.MapFrom(s => s.User.Id));

        CreateMap<User, UserProfile>();
        CreateMap<EditProfileDto, User>();

         CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
        
    }
}
using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Profiles.DTOs;

public class EditProfileDto
{
    [Required]
    public string DisplayName { get; set; } = string.Empty;

    public string Bio { get; set; } = string.Empty;
}

namespace supercontestV2.Models
{
    public class UserPick
    {
        public int? Id { get; set; }
        public string UserId { get; set; }
        public int week { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string? Pick1 { get; set; }
        public string? Pick2 { get; set; }
        public string? Pick3 { get; set; }
        public string? Pick4 { get; set; }
        public string? Pick5 { get; set; }
    }
}
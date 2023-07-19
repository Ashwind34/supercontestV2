namespace supercontestV2.Models
{
    public class AppSettings
    {
        public int Id { get; set; }

        public int CurrentWeek { get; set; }
        public DateTime SeasonStart { get; set; }
        public bool EnableApp { get; set; }
    }
}
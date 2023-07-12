namespace supercontestV2.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int Week { get; set; }
        public string HomeTeam { get; set; }
        public int? HomeSpread { get; set; }
        public int? HomeScore { get; set; }
        public float? HomePickValue { get; set; }
        public string AwayTeam { get; set; }
        public int? AwaySpread { get; set; }
        public int? AwayScore { get; set; }
        public int? AwayPickValue { get; set; }

        public DateTime StartTime { get; set; }



    }
}
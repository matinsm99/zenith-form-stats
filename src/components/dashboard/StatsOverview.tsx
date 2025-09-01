import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, MousePointer, Target, BarChart3 } from "lucide-react";
import { trackingService } from "@/services/trackingService";

interface StatsOverviewProps {
  data: any[];
}

const StatsOverview = ({ data }: StatsOverviewProps) => {
  const stats = trackingService.getStats(data);
  const sourceStats = trackingService.getSourceStats(data);
  const deviceStats = trackingService.getDeviceStats(data);
  const countryStats = trackingService.getCountryStats(data);

  const statCards = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions.toLocaleString(),
      description: "Form submissions tracked",
      icon: MousePointer,
      color: "text-primary"
    },
    {
      title: "With UTM Data",
      value: stats.withUTM.toLocaleString(),
      description: `${Math.round((stats.withUTM / stats.totalSubmissions) * 100)}% of submissions`,
      icon: Target,
      color: "text-success"
    },
    {
      title: "Unique Countries",
      value: stats.uniqueCountries.toString(),
      description: "Geographic reach",
      icon: Globe,
      color: "text-primary"
    },
    {
      title: "Top Source",
      value: stats.topSource,
      description: "Most common UTM source",
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Sources */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Top Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sourceStats.slice(0, 5).map((item, index) => (
              <div key={item.source} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-primary' : 
                    index === 1 ? 'bg-success' : 
                    index === 2 ? 'bg-accent-foreground' : 'bg-muted-foreground'
                  }`} />
                  <span className="text-sm capitalize">{item.source}</span>
                </div>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Devices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deviceStats.map((item, index) => (
              <div key={item.device} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-primary' : 
                    index === 1 ? 'bg-success' : 'bg-accent-foreground'
                  }`} />
                  <span className="text-sm">{item.device}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    {Math.round((item.count / stats.totalSubmissions) * 100)}%
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Countries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {countryStats.slice(0, 5).map((item, index) => (
              <div key={item.country} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-primary' : 
                    index === 1 ? 'bg-success' : 
                    index === 2 ? 'bg-accent-foreground' : 'bg-muted-foreground'
                  }`} />
                  <span className="text-sm">{item.country}</span>
                </div>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card className="shadow-soft bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-primary/5 p-3 rounded-lg">
              <div className="font-semibold text-primary">Attribution Rate</div>
              <div className="text-muted-foreground">
                {Math.round((stats.withUTM / stats.totalSubmissions) * 100)}% of submissions have UTM tracking data
              </div>
            </div>
            
            <div className="bg-success/5 p-3 rounded-lg">
              <div className="font-semibold text-success">Top Campaign</div>
              <div className="text-muted-foreground">
                "{stats.topCampaign}" is your best performing campaign
              </div>
            </div>
            
            <div className="bg-accent/20 p-3 rounded-lg">
              <div className="font-semibold text-accent-foreground">Mobile Usage</div>
              <div className="text-muted-foreground">
                {Math.round((deviceStats.find(d => d.device === 'Mobile')?.count || 0) / stats.totalSubmissions * 100)}% of users are on mobile devices
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
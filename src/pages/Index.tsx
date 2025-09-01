import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Eye, Filter, Search, Globe, Smartphone, Monitor, TrendingUp, Users, MousePointer } from "lucide-react";
import TrackingScript from "@/components/tracking/TrackingScript";
import FormIntegration from "@/components/tracking/FormIntegration";
import StatsOverview from "@/components/dashboard/StatsOverview";
import DataTable from "@/components/dashboard/DataTable";
import FilterPanel from "@/components/dashboard/FilterPanel";
import { trackingService } from "@/services/trackingService";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: "7d",
    country: "",
    device: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: ""
  });

  useEffect(() => {
    // Load mock data
    const mockData = trackingService.getMockData();
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  useEffect(() => {
    // Apply filters
    const filtered = trackingService.filterData(data, filters);
    setFilteredData(filtered);
  }, [data, filters]);

  const handleExportData = () => {
    trackingService.exportToCSV(filteredData);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Privacy Tracker</h1>
                <p className="text-sm text-muted-foreground">GDPR-compliant analytics</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success">
              Privacy Safe
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Integration
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Tracking Script
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Raw Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Analytics Dashboard</h2>
              <Button onClick={handleExportData} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
            
            <StatsOverview data={filteredData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FilterPanel filters={filters} onFiltersChange={setFilters} />
              </div>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingService.getDeviceStats(filteredData).map((item, index) => (
                      <div key={item.device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.device === 'Desktop' ? 
                            <Monitor className="h-4 w-4 text-muted-foreground" /> : 
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                          }
                          <span className="text-sm">{item.device}</span>
                        </div>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <DataTable data={filteredData} />
          </TabsContent>

          <TabsContent value="integration">
            <FormIntegration />
          </TabsContent>

          <TabsContent value="tracking">
            <TrackingScript />
          </TabsContent>

          <TabsContent value="data">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Raw Data Export</CardTitle>
                <CardDescription>
                  Download all tracking data in CSV format for external analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Data Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Data</SelectItem>
                        <SelectItem value="utm">UTM Only</SelectItem>
                        <SelectItem value="device">Device Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleExportData} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• All data is anonymized and GDPR compliant</p>
                    <p>• No personal information or IP addresses are stored</p>
                    <p>• Country data is aggregated for privacy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
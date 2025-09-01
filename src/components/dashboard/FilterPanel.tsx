import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Calendar, Globe, Monitor, Target } from "lucide-react";
import { trackingService } from "@/services/trackingService";

interface FilterPanelProps {
  filters: {
    dateRange: string;
    country: string;
    device: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const allData = trackingService.getMockData();
  
  const uniqueCountries = trackingService.getUniqueValues(allData, 'country');
  const uniqueDevices = trackingService.getUniqueValues(allData, 'device_type');
  const uniqueSources = trackingService.getUniqueValues(allData, 'utm_source');
  const uniqueMediums = trackingService.getUniqueValues(allData, 'utm_medium');
  const uniqueCampaigns = trackingService.getUniqueValues(allData, 'utm_campaign');

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: "7d",
      country: "",
      device: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: ""
    });
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    value && value !== "7d"
  ).length;

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount} active
              </Badge>
            )}
          </CardTitle>
          {activeFilterCount > 0 && (
            <Button 
              onClick={clearFilters} 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Date Range
            </label>
            <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Country
            </label>
            <Select value={filters.country} onValueChange={(value) => updateFilter('country', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All countries</SelectItem>
                {uniqueCountries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Device */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Monitor className="h-4 w-4 text-primary" />
              Device
            </label>
            <Select value={filters.device} onValueChange={(value) => updateFilter('device', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All devices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All devices</SelectItem>
                {uniqueDevices.map(device => (
                  <SelectItem key={device} value={device}>{device}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* UTM Source */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              UTM Source
            </label>
            <Select value={filters.utmSource} onValueChange={(value) => updateFilter('utmSource', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All sources</SelectItem>
                {uniqueSources.map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* UTM Medium */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              UTM Medium
            </label>
            <Select value={filters.utmMedium} onValueChange={(value) => updateFilter('utmMedium', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All mediums" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All mediums</SelectItem>
                {uniqueMediums.map(medium => (
                  <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* UTM Campaign */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              UTM Campaign
            </label>
            <Select value={filters.utmCampaign} onValueChange={(value) => updateFilter('utmCampaign', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All campaigns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All campaigns</SelectItem>
                {uniqueCampaigns.map(campaign => (
                  <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
              {filters.country && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Country: {filters.country}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-foreground" 
                    onClick={() => updateFilter('country', '')}
                  />
                </Badge>
              )}
              {filters.device && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Device: {filters.device}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-foreground" 
                    onClick={() => updateFilter('device', '')}
                  />
                </Badge>
              )}
              {filters.utmSource && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Source: {filters.utmSource}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-foreground" 
                    onClick={() => updateFilter('utmSource', '')}
                  />
                </Badge>
              )}
              {filters.utmMedium && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Medium: {filters.utmMedium}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-foreground" 
                    onClick={() => updateFilter('utmMedium', '')}
                  />
                </Badge>
              )}
              {filters.utmCampaign && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Campaign: {filters.utmCampaign}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-foreground" 
                    onClick={() => updateFilter('utmCampaign', '')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
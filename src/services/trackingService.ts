interface TrackingData {
  id: string;
  timestamp: number;
  formType: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  device_type: string;
  browser: string;
  country: string;
  form_data: Record<string, any>;
}

interface FilterOptions {
  dateRange: string;
  country: string;
  device: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

class TrackingService {
  private mockData: TrackingData[] = [];

  constructor() {
    this.generateMockData();
  }

  private generateMockData(): void {
    const sources = ['google', 'facebook', 'twitter', 'linkedin', 'email', 'direct'];
    const mediums = ['cpc', 'social', 'email', 'organic', 'referral'];
    const campaigns = ['summer-sale', 'product-launch', 'newsletter', 'retargeting', 'brand-awareness'];
    const countries = ['US', 'UK', 'CA', 'DE', 'FR', 'AU', 'JP'];
    const devices = ['Desktop', 'Mobile', 'Tablet'];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const formTypes = ['Contact Form', 'Newsletter', 'Demo Request', 'Download'];
    const referrers = ['google.com', 'facebook.com', 'twitter.com', 'linkedin.com', 'direct'];

    // Generate 150 mock entries over the last 30 days
    for (let i = 0; i < 150; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const timestamp = Date.now() - (daysAgo * 24 * 60 * 60 * 1000) - (Math.random() * 24 * 60 * 60 * 1000);
      
      const hasUTM = Math.random() > 0.3; // 70% have UTM data
      
      this.mockData.push({
        id: `entry_${i + 1}`,
        timestamp,
        formType: formTypes[Math.floor(Math.random() * formTypes.length)],
        utm_source: hasUTM ? sources[Math.floor(Math.random() * sources.length)] : undefined,
        utm_medium: hasUTM ? mediums[Math.floor(Math.random() * mediums.length)] : undefined,
        utm_campaign: hasUTM ? campaigns[Math.floor(Math.random() * campaigns.length)] : undefined,
        utm_term: hasUTM && Math.random() > 0.7 ? `term_${Math.floor(Math.random() * 10)}` : undefined,
        utm_content: hasUTM && Math.random() > 0.8 ? `content_${Math.floor(Math.random() * 5)}` : undefined,
        referrer: Math.random() > 0.2 ? referrers[Math.floor(Math.random() * referrers.length)] : undefined,
        device_type: devices[Math.floor(Math.random() * devices.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        form_data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          message: 'Sample form submission'
        }
      });
    }

    // Sort by timestamp (newest first)
    this.mockData.sort((a, b) => b.timestamp - a.timestamp);
  }

  getMockData(): TrackingData[] {
    return this.mockData;
  }

  filterData(data: TrackingData[], filters: FilterOptions): TrackingData[] {
    let filtered = [...data];

    // Date range filter
    const now = Date.now();
    const ranges: Record<string, number> = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000
    };

    if (filters.dateRange && ranges[filters.dateRange]) {
      const cutoff = now - ranges[filters.dateRange];
      filtered = filtered.filter(item => item.timestamp >= cutoff);
    }

    // Other filters - handle "all" values
    if (filters.country && filters.country !== "all") {
      filtered = filtered.filter(item => item.country === filters.country);
    }

    if (filters.device && filters.device !== "all") {
      filtered = filtered.filter(item => item.device_type === filters.device);
    }

    if (filters.utmSource && filters.utmSource !== "all") {
      filtered = filtered.filter(item => item.utm_source === filters.utmSource);
    }

    if (filters.utmMedium && filters.utmMedium !== "all") {
      filtered = filtered.filter(item => item.utm_medium === filters.utmMedium);
    }

    if (filters.utmCampaign && filters.utmCampaign !== "all") {
      filtered = filtered.filter(item => item.utm_campaign === filters.utmCampaign);
    }

    return filtered;
  }

  getStats(data: TrackingData[]) {
    return {
      totalSubmissions: data.length,
      withUTM: data.filter(item => item.utm_source).length,
      uniqueCountries: new Set(data.map(item => item.country)).size,
      topSource: this.getTopValue(data, 'utm_source'),
      topMedium: this.getTopValue(data, 'utm_medium'),
      topCampaign: this.getTopValue(data, 'utm_campaign')
    };
  }

  getChartData(data: TrackingData[]) {
    // Group by date for trend chart
    const dateGroups: Record<string, number> = {};
    data.forEach(item => {
      const date = new Date(item.timestamp).toLocaleDateString();
      dateGroups[date] = (dateGroups[date] || 0) + 1;
    });

    return Object.entries(dateGroups)
      .map(([date, count]) => ({ date, submissions: count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-14); // Last 14 days
  }

  getSourceStats(data: TrackingData[]) {
    const sources: Record<string, number> = {};
    data.forEach(item => {
      const source = item.utm_source || 'Direct';
      sources[source] = (sources[source] || 0) + 1;
    });

    return Object.entries(sources)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);
  }

  getDeviceStats(data: TrackingData[]) {
    const devices: Record<string, number> = {};
    data.forEach(item => {
      devices[item.device_type] = (devices[item.device_type] || 0) + 1;
    });

    return Object.entries(devices)
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count);
  }

  getCountryStats(data: TrackingData[]) {
    const countries: Record<string, number> = {};
    data.forEach(item => {
      countries[item.country] = (countries[item.country] || 0) + 1;
    });

    return Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }

  private getTopValue(data: TrackingData[], field: keyof TrackingData): string {
    const counts: Record<string, number> = {};
    data.forEach(item => {
      const value = item[field] as string;
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  }

  exportToCSV(data: TrackingData[]): void {
    const headers = [
      'ID', 'Timestamp', 'Date', 'Form Type', 'UTM Source', 'UTM Medium', 'UTM Campaign',
      'UTM Term', 'UTM Content', 'Referrer', 'Device Type', 'Browser', 'Country'
    ];

    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        item.id,
        item.timestamp,
        new Date(item.timestamp).toISOString(),
        item.formType,
        item.utm_source || '',
        item.utm_medium || '',
        item.utm_campaign || '',
        item.utm_term || '',
        item.utm_content || '',
        item.referrer || '',
        item.device_type,
        item.browser,
        item.country
      ].map(field => `\"${field}\"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tracking_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getUniqueValues(data: TrackingData[], field: keyof TrackingData): string[] {
    const values = new Set<string>();
    data.forEach(item => {
      const value = item[field] as string;
      if (value) values.add(value);
    });
    return Array.from(values).sort();
  }
}

export const trackingService = new TrackingService();

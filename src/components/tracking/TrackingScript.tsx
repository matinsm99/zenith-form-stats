import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Code, Shield, Globe, Eye, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TrackingScript = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const trackingCode = `<!-- Privacy-Safe Tracking Script -->
<script>
(function() {
  'use strict';
  
  // Privacy-safe tracking configuration
  const PRIVACY_TRACKER = {
    version: '1.0.0',
    debug: false,
    
    // UTM parameter capture
    captureUTM: function() {
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {};
      
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          utmData[param] = value;
        }
      });
      
      if (Object.keys(utmData).length > 0) {
        utmData.timestamp = Date.now();
        localStorage.setItem('privacy_tracker_utm', JSON.stringify(utmData));
        this.log('UTM data captured:', utmData);
      }
    },
    
    // Sanitized referrer capture
    captureReferrer: function() {
      if (document.referrer) {
        try {
          const referrerUrl = new URL(document.referrer);
          // Only store domain, strip sensitive query parameters
          const sanitizedReferrer = referrerUrl.hostname;
          localStorage.setItem('privacy_tracker_referrer', sanitizedReferrer);
          this.log('Referrer captured:', sanitizedReferrer);
        } catch (e) {
          this.log('Invalid referrer URL');
        }
      }
    },
    
    // Device type detection (non-fingerprinting)
    getDeviceInfo: function() {
      const userAgent = navigator.userAgent;
      let deviceType = 'Desktop';
      let browser = 'Unknown';
      
      // Simple device detection
      if (/Mobi|Android/i.test(userAgent)) {
        deviceType = 'Mobile';
      } else if (/Tablet|iPad/i.test(userAgent)) {
        deviceType = 'Tablet';
      }
      
      // Basic browser detection
      if (userAgent.includes('Chrome')) browser = 'Chrome';
      else if (userAgent.includes('Firefox')) browser = 'Firefox';
      else if (userAgent.includes('Safari')) browser = 'Safari';
      else if (userAgent.includes('Edge')) browser = 'Edge';
      
      return { deviceType, browser };
    },
    
    // Get stored tracking data
    getTrackingData: function() {
      const utmData = localStorage.getItem('privacy_tracker_utm');
      const referrer = localStorage.getItem('privacy_tracker_referrer');
      const device = this.getDeviceInfo();
      
      return {
        utm: utmData ? JSON.parse(utmData) : null,
        referrer: referrer || null,
        device: device,
        country: null, // Will be set server-side via GeoIP
        timestamp: Date.now()
      };
    },
    
    // Attach to form submissions
    attachToForms: function() {
      const forms = document.querySelectorAll('form[data-privacy-track]');
      
      forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          const trackingData = this.getTrackingData();
          
          // Add hidden input with tracking data
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = 'privacy_tracking_data';
          hiddenInput.value = JSON.stringify(trackingData);
          form.appendChild(hiddenInput);
          
          this.log('Tracking data attached to form:', trackingData);
        });
      });
    },
    
    // Logging helper
    log: function(message, data) {
      if (this.debug) {
        console.log('[Privacy Tracker]', message, data || '');
      }
    },
    
    // Initialize tracking
    init: function() {
      this.log('Privacy Tracker initialized');
      this.captureUTM();
      this.captureReferrer();
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.attachToForms();
        });
      } else {
        this.attachToForms();
      }
    }
  };
  
  // Auto-initialize
  PRIVACY_TRACKER.init();
  
  // Make available globally for manual usage
  window.PrivacyTracker = PRIVACY_TRACKER;
})();
</script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingCode);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Tracking script copied successfully"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Tracking Script</h2>
          <p className="text-muted-foreground">Privacy-safe JavaScript snippet for your website</p>
        </div>
        <Badge variant="secondary" className="bg-success/10 text-success flex items-center gap-2">
          <Shield className="h-3 w-3" />
          GDPR Compliant
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5 text-primary" />
              What It Tracks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">UTM Parameters</span>
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sanitized Referrer</span>
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Device Type</span>
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Browser Name</span>
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Country (Server-side)</span>
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-success" />
              Privacy Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <p>✓ No IP address storage</p>
              <p>✓ No user fingerprinting</p>
              <p>✓ No cross-site tracking</p>
              <p>✓ Referrer URL sanitization</p>
              <p>✓ GDPR compliant by design</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium mb-2">Easy Setup:</p>
              <p className="text-muted-foreground">1. Copy script below</p>
              <p className="text-muted-foreground">2. Add to your HTML head</p>
              <p className="text-muted-foreground">3. Add data-privacy-track to forms</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            JavaScript Tracking Code
          </CardTitle>
          <CardDescription>
            Copy this script and paste it in your website's &lt;head&gt; section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{trackingCode}</code>
            </pre>
            <Button
              onClick={handleCopy}
              className="absolute top-2 right-2"
              size="sm"
              variant="secondary"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="implementation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="implementation">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Implementation Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Step 1: Add Script to HTML</h4>
                  <p className="text-sm text-muted-foreground">
                    Paste the tracking script in your website's &lt;head&gt; section
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Step 2: Mark Forms for Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Add <code className="bg-muted px-1 rounded">data-privacy-track</code> attribute to forms you want to track
                  </p>
                  <pre className="bg-muted p-2 rounded text-xs mt-2">
{`<form data-privacy-track action="/submit" method="POST">
  <!-- Your form fields -->
</form>`}
                  </pre>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Step 3: Handle Backend Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Process the <code className="bg-muted px-1 rounded">privacy_tracking_data</code> field in your form handler
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Testing Your Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-accent/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Enable Debug Mode</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Change <code>debug: false</code> to <code>debug: true</code> in the script to see console logs
                  </p>
                  <pre className="bg-muted p-2 rounded text-xs">
{`const PRIVACY_TRACKER = {
  debug: true, // Enable debugging
  // ... rest of config
};`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Test Checklist:</h4>
                  <div className="text-sm space-y-1">
                    <p>• Visit your site with UTM parameters: <code className="bg-muted px-1 rounded">?utm_source=test&utm_medium=email</code></p>
                    <p>• Check localStorage for captured UTM data</p>
                    <p>• Submit a form and verify tracking data is attached</p>
                    <p>• Test from different devices and browsers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Custom UTM Parameters</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add custom parameters to track:
                  </p>
                  <pre className="bg-muted p-2 rounded text-xs">
{`// Add custom parameters to the array
['utm_source', 'utm_medium', 'utm_campaign', 'custom_param'].forEach(...)`}
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Manual Tracking</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Access tracking data programmatically:
                  </p>
                  <pre className="bg-muted p-2 rounded text-xs">
{`// Get current tracking data
const data = window.PrivacyTracker.getTrackingData();

// Manually capture UTM (useful for SPAs)
window.PrivacyTracker.captureUTM();`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackingScript;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointer, Code, Server, Database, Shield, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FormIntegration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate what the tracking script would do
    const mockTrackingData = {
      utm: {
        utm_source: "demo",
        utm_medium: "dashboard",
        utm_campaign: "test",
        timestamp: Date.now()
      },
      referrer: "lovable.dev",
      device: {
        deviceType: "Desktop",
        browser: "Chrome"
      },
      country: "US",
      timestamp: Date.now()
    };

    toast({
      title: "Form submitted successfully!",
      description: "Tracking data would be attached automatically",
    });

    console.log("Form Data:", formData);
    console.log("Tracking Data:", mockTrackingData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Form Integration</h2>
          <p className="text-muted-foreground">How to integrate privacy-safe tracking with your forms</p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary flex items-center gap-2">
          <MousePointer className="h-3 w-3" />
          Easy Integration
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demo Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-primary" />
              Live Demo Form
            </CardTitle>
            <CardDescription>
              Try submitting this form to see how tracking data is attached
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDemoSubmit} className="space-y-4" data-privacy-track>
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Enter your message"
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Submit Demo Form
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-accent/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <Shield className="h-3 w-3 inline mr-1" />
                This form includes the <code>data-privacy-track</code> attribute
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Integration Steps */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Integration Process</CardTitle>
            <CardDescription>
              How the tracking system automatically attaches data to your forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-sm">User Visits Page</h4>
                  <p className="text-xs text-muted-foreground">UTM parameters and referrer are captured and stored in localStorage</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-sm">Form Submission</h4>
                  <p className="text-xs text-muted-foreground">Script detects forms with data-privacy-track attribute</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-sm">Data Attachment</h4>
                  <p className="text-xs text-muted-foreground">Tracking data is automatically added as a hidden field</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-sm">Backend Processing</h4>
                  <p className="text-xs text-muted-foreground">Your server receives form data + privacy_tracking_data field</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="html" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="html" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            HTML
          </TabsTrigger>
          <TabsTrigger value="backend" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Backend
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="html">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>HTML Form Setup</CardTitle>
              <CardDescription>
                Add the data-privacy-track attribute to any form you want to track
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Form Example</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
<code>{`<!-- Contact Form -->
<form data-privacy-track action="/contact" method="POST">
  <input type="text" name="name" placeholder="Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send Message</button>
</form>

<!-- Newsletter Signup -->
<form data-privacy-track action="/newsletter" method="POST">
  <input type="email" name="email" placeholder="Email" required>
  <button type="submit">Subscribe</button>
</form>`}</code>
                  </pre>
                </div>
                
                <div className="bg-accent/30 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Important:</p>
                  <p className="text-xs text-muted-foreground">
                    Only add <code>data-privacy-track</code> to forms where you want to collect marketing attribution data. The script will ignore forms without this attribute.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backend">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Backend Processing</CardTitle>
              <CardDescription>
                Handle the privacy_tracking_data field in your server-side code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">PHP Example</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
<code>{`<?php
// Process form submission
if ($_POST['privacy_tracking_data']) {
    $tracking_data = json_decode($_POST['privacy_tracking_data'], true);
    
    // Extract tracking information
    $utm_source = $tracking_data['utm']['utm_source'] ?? null;
    $utm_medium = $tracking_data['utm']['utm_medium'] ?? null;
    $utm_campaign = $tracking_data['utm']['utm_campaign'] ?? null;
    $referrer = $tracking_data['referrer'] ?? null;
    $device_type = $tracking_data['device']['deviceType'] ?? null;
    $browser = $tracking_data['device']['browser'] ?? null;
    
    // Get country from server-side GeoIP (recommended)
    $country = getCountryFromIP($_SERVER['REMOTE_ADDR']);
    
    // Store in database
    $stmt = $pdo->prepare("
        INSERT INTO form_submissions 
        (name, email, message, utm_source, utm_medium, utm_campaign, 
         referrer, device_type, browser, country, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    
    $stmt->execute([
        $_POST['name'],
        $_POST['email'], 
        $_POST['message'],
        $utm_source,
        $utm_medium,
        $utm_campaign,
        $referrer,
        $device_type,
        $browser,
        $country
    ]);
}
?>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Node.js/Express Example</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
<code>{`app.post('/contact', (req, res) => {
  const { name, email, message, privacy_tracking_data } = req.body;
  
  let trackingData = {};
  if (privacy_tracking_data) {
    try {
      trackingData = JSON.parse(privacy_tracking_data);
    } catch (e) {
      console.error('Invalid tracking data:', e);
    }
  }
  
  // Get country from IP (use a GeoIP service)
  const country = getCountryFromIP(req.ip);
  
  // Save to database
  await FormSubmission.create({
    name,
    email,
    message,
    utm_source: trackingData.utm?.utm_source,
    utm_medium: trackingData.utm?.utm_medium,
    utm_campaign: trackingData.utm?.utm_campaign,
    referrer: trackingData.referrer,
    device_type: trackingData.device?.deviceType,
    browser: trackingData.device?.browser,
    country
  });
  
  res.json({ success: true });
});`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>
                Recommended table structure for storing tracking data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">MySQL Schema</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
<code>{`CREATE TABLE form_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Form data (user-provided)
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    
    -- UTM tracking data
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    
    -- Privacy-safe context data
    referrer VARCHAR(255),        -- Sanitized referrer domain only
    device_type VARCHAR(50),      -- Desktop, Mobile, Tablet
    browser VARCHAR(50),          -- Chrome, Firefox, Safari, etc.
    country CHAR(2),              -- ISO country code (from server-side GeoIP)
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for analytics queries
    INDEX idx_utm_source (utm_source),
    INDEX idx_utm_campaign (utm_campaign),
    INDEX idx_country (country),
    INDEX idx_device_type (device_type),
    INDEX idx_created_at (created_at)
);`}</code>
                  </pre>
                </div>

                <div className="bg-success/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-success mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Privacy-Safe Design
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• No IP addresses stored</li>
                    <li>• No unique user identifiers</li>
                    <li>• Referrer URLs are sanitized</li>
                    <li>• Only aggregated country data</li>
                    <li>• High-level device information only</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Privacy Compliance</CardTitle>
              <CardDescription>
                Built-in GDPR compliance and privacy protection measures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                    <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      What We DO Track
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ UTM marketing parameters</li>
                      <li>✓ Sanitized referrer domains</li>
                      <li>✓ Device type (Desktop/Mobile)</li>
                      <li>✓ Browser name (Chrome/Firefox)</li>
                      <li>✓ Country (via server-side GeoIP)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">
                      What We DON'T Track
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>✗ IP addresses (even hashed)</li>
                      <li>✗ Unique user identifiers</li>
                      <li>✗ Cross-site tracking</li>
                      <li>✗ Behavioral fingerprinting</li>
                      <li>✗ Personal browsing history</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-accent/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">GDPR Compliance Notes</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>Legal Basis:</strong> This tracking system operates under "Legitimate Interest" 
                      for marketing attribution, as it collects only anonymous, non-personal data.
                    </p>
                    <p>
                      <strong>Data Minimization:</strong> Only essential marketing attribution data is collected. 
                      No personal identifiers or behavioral tracking.
                    </p>
                    <p>
                      <strong>Transparency:</strong> Consider adding a brief note in your privacy policy 
                      about marketing attribution tracking for full transparency.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormIntegration;
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Twitter, Mail, Globe, Copy } from "lucide-react";
import heroBackground from "../../public/header-image.jpg";
import profilePhoto from "../../public/profile-photo.png";
import Image from "next/image";
// import { toast } from "@/hooks/use-toast";

export const ProfileHeader = ({user}) => {
  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // toast({
    //   title: "Profile link copied!",
    //   description: "Share this link to collect testimonials.",
    // });
  };

  return (
    <div className="relative">
      {/* Hero Background */}
      <div 
        className="h-64 bg-gradient-hero bg-cover bg-center bg-no-repeat rounded-t-xl"
        style={{ backgroundImage: ` url(${heroBackground.src})` }}
      >
        <div className="absolute top-4 right-4">
          <Button 
            onClick={copyProfileLink}
            variant="secondary" 
            size="sm"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-smooth"
          >
            <Copy className="w-4 h-4 mr-2" />
            Share Profile
          </Button>
        </div>
      </div>

      {/* Profile Info Card */}
      <Card className="relative -mt-16 mx-6 p-8 bg-gradient-card shadow-soft border-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Profile Photo */}
          
            <Image className="rounded-full w-140 h-140" width={100} height={100} src={user.avatarUrl} alt="Profile" />
            
      

          {/* Profile Details */}
          <div className="flex-1 mt-10">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{user.fullname}</h1>
              <p className="text-xl text-muted-foreground mb-3">Senior Product Designer</p>
              <p className="text-gray-200 leading-relaxed max-w-2xl">
                Passionate about creating exceptional user experiences. I help businesses build products that users love. 
                Share your experience working with me!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="transition-smooth hover:shadow-soft">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="transition-smooth hover:shadow-soft">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="transition-smooth hover:shadow-soft">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm" className="transition-smooth hover:shadow-soft">
                <Globe className="w-4 h-4 mr-2" />
                Website
              </Button>
              <Button variant="outline" size="sm" className="transition-smooth hover:shadow-soft">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="lg:text-right">
            <Button size="lg" className="w-full lg:w-auto mb-3 transition-smooth hover:shadow-soft">
              Leave a Testimonial
            </Button>
            <p className="text-sm text-muted-foreground">
              Help others discover great work
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
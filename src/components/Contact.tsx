import { Github, Linkedin, Mail, Phone, Twitter, UserSquare } from "lucide-react";

const Contact = () => {
  const developer = {
    name: "Shubhat Rashid",
    role: "Full Stack Developer",
    github: {
      url: "https://github.com/shubhatRashid",
      label: "github.com/ShubhatRashid",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/shubhat-rashid-b52b40276/",
      label: "linkedin.com/in/ShubhatRashid",
    },
    portfolio: {
        url: "https://shubhatrashid.vercel.app",
        label: "portfolio@shubhatRashid",
      },
  };

  const contact = {
    email: "shubhatrashid@outlook.com",
    phone: "+91 7006370432",
    twitter: {
      url: "https://x.com/shubhat_rashid",
      label: "@shubhat_rashid",
    },
  };

  return (
    <section className="border-b border-gray-200 mx-auto text-left w-full flex flex-col gap-10 bg-gray-50 py-10">
      <h3 className="text-3xl text-gray-900 w-full font-bold flex justify-center items-center">
        Developer & Contact Info
      </h3>

      <div className="flex flex-col md:flex-row justify-evenly items-start gap-10 w-full">
        {/* Developer Info */}
        <div className="flex flex-col justify-center items-start">
          <h4 className="text-xl font-bold text-purple-700 mb-4">Developer</h4>
          <p className="pl-2.5 text-gray-700 mb-1">{developer.name}</p>
          <p className="pl-2.5 text-gray-600 mb-3">{developer.role}</p>
          <InfoRow icon={<UserSquare className="pl-2.5 w-5 h-5 text-purple-600" />} url={developer.portfolio.url} label={developer.portfolio.label} />
          <InfoRow icon={<Github className="pl-2.5 w-5 h-5 text-purple-600" />} url={developer.github.url} label={developer.github.label} />
          <InfoRow icon={<Linkedin className="pl-2.5 w-5 h-5 text-purple-600" />} url={developer.linkedin.url} label={developer.linkedin.label} />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center items-start mb-auto">
          <h4 className="text-xl font-bold text-purple-700 mb-4">Contact</h4>
          <InfoRow icon={<Mail className="pl-2.5 w-5 h-5 text-purple-600" />} url={`mailto:${contact.email}`} label={contact.email} />
          <InfoRow icon={<Phone className="pl-2.5 w-5 h-5 text-purple-600" />} label={contact.phone} />
          <InfoRow icon={<Twitter className="pl-2.5 w-5 h-5 text-purple-600" />} url={contact.twitter.url} label={contact.twitter.label} />
        </div>
      </div>
    </section>
  );
};

// Reusable row component
const InfoRow = ({ icon, url, label }: { icon: React.ReactNode; url?: string; label: string }) => (
  <div className="flex items-center space-x-4 text-gray-600 mb-3">
    {icon}
    {url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline text-purple-700">
        {label}
      </a>
    ) : (
      <span>{label}</span>
    )}
  </div>
);

export default Contact;

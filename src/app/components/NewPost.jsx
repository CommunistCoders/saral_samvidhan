import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NewPost() {
  const { data: session } = useSession(); // Get the current session
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold selected image
  const [selectedTags, setSelectedTags] = useState([]); // State to hold selected tags
  const [tags, setTags] = useState([]); // Store selected tags
  const [newPhoto, setNewPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
      // Set the selected image for preview
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null); // Remove the selected image
  };


  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if the user is logged in
    if (!session) {
      alert("You must be logged in to create a post.");
      setIsSubmitting(false);
      return;
    }

    const userId = session.user.id; // Assuming user ID is stored here in session
    const tags = selectedTags.map(tag => tag.value); // Get the selected tag values

    const formData = new FormData();
    formData.append('file', newPhoto);


    try {
      //First Uploading
      let response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data1 = await response.json();
      if (response.ok) {
        console.log("data1 :",data1.url);
      } else {
        console.error(data.message);
      }
      //Now uploading the post
      response = await fetch("/api/discussionforum/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId,title, content, location, imageUrl:data1.url,tags }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Post Failed: ${data.message || "Server Error"}`);
        return;
      }

      alert(data.message || "Post created successfully");

      // Clear the form and remove selected image
      setContent("");
      setTitle("");
      setLocation("");
      setSelectedImage(null); // Reset selected image after post creation
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const communities = [
      {
        id: 1,
        name: 'Constitutional Law',
        description: 'Discussions on fundamental rights, amendments, and constitutional interpretation.',
        memberCount: 105000,
        avatarUrl: '/path/to/image1.jpg',
        tags: ['Fundamental Rights', 'Amendments', 'Judicial Review', 'Bill of Rights', 'Separation of Powers']
      },
      {
        id: 2,
        name: 'Criminal Law',
        description: 'Topics on criminal justice, cases, reforms, and legal precedents.',
        memberCount: 89000,
        avatarUrl: '/path/to/image2.jpg',
        tags: ['Criminal Justice', 'Reform', 'Legal Precedents', 'Case Studies', 'Criminal Procedure']
      },
      {
        id: 3,
        name: 'Civil Rights and Liberties',
        description: 'Discussions on human rights, discrimination cases, and civil liberties.',
        memberCount: 68000,
        avatarUrl: '/path/to/image3.jpg',
        tags: ['Human Rights', 'Discrimination', 'Freedom of Speech', 'Civil Liberties', 'Equality']
      },
      {
        id: 4,
        name: 'Family Law',
        description: 'A community for issues around marriage, divorce, custody, and related rights.',
        memberCount: 45000,
        avatarUrl: '/path/to/image4.jpg',
        tags: ['Marriage', 'Divorce', 'Custody', 'Adoption', 'Child Support']
      },
      {
        id: 5,
        name: 'Corporate and Business Law',
        description: 'For discussions on corporate governance, mergers, and international business law.',
        memberCount: 74000,
        avatarUrl: '/path/to/image5.jpg',
        tags: ['Corporate Governance', 'Mergers', 'Acquisitions', 'International Business', 'Compliance']
      },
      {
        id: 6,
        name: 'Environmental Law',
        description: 'Focus on laws related to environmental protection, sustainability, and climate change.',
        memberCount: 53000,
        avatarUrl: '/path/to/image6.jpg',
        tags: ['Climate Change', 'Sustainability', 'Environmental Protection', 'Pollution', 'Wildlife Law']
      },
      {
        id: 7,
        name: 'Intellectual Property Law',
        description: 'Topics around copyrights, patents, trademarks, and related cases.',
        memberCount: 59000,
        avatarUrl: '/path/to/image7.jpg',
        tags: ['Copyrights', 'Patents', 'Trademarks', 'Infringement', 'Intellectual Property']
      },
      {
        id: 8,
        name: 'Employment and Labor Law',
        description: 'Discussions on labor rights, employment disputes, and workplace regulations.',
        memberCount: 48000,
        avatarUrl: '/path/to/image8.jpg',
        tags: ['Labor Rights', 'Employment Disputes', 'Workplace Regulations', 'Unions', 'Wages']
      },
      {
        id: 9,
        name: 'Immigration Law',
        description: 'Focus on policies, visa issues, and international immigration cases.',
        memberCount: 52000,
        avatarUrl: '/path/to/image9.jpg',
        tags: ['Visas', 'Asylum', 'Deportation', 'Immigration Policies', 'Citizenship']
      },
      {
        id: 10,
        name: 'Tax Law',
        description: 'Discussions on tax regulations, reform, and compliance strategies.',
        memberCount: 36000,
        avatarUrl: '/path/to/image10.jpg',
        tags: ['Tax Regulations', 'Tax Reform', 'Compliance', 'Income Tax', 'Corporate Tax']
      },
      {
        id: 11,
        name: 'Property and Real Estate Law',
        description: 'Topics on land rights, real estate transactions, and property disputes.',
        memberCount: 42000,
        avatarUrl: '/path/to/image11.jpg',
        tags: ['Land Rights', 'Real Estate Transactions', 'Property Disputes', 'Mortgages', 'Land Use']
      },
      {
        id: 12,
        name: 'Cyber and Privacy Law',
        description: 'Focus on data protection, cybersecurity, and digital privacy issues.',
        memberCount: 49000,
        avatarUrl: '/path/to/image12.jpg',
        tags: ['Data Protection', 'Cybersecurity', 'Privacy', 'Internet Law', 'Data Breaches']
      },
      {
        id: 13,
        name: 'Health Law and Bioethics',
        description: 'For discussions on healthcare policy, bioethics, and patient rights.',
        memberCount: 37000,
        avatarUrl: '/path/to/image13.jpg',
        tags: ['Healthcare Policy', 'Bioethics', 'Patient Rights', 'Medical Malpractice', 'Healthcare Access']
      },
      {
        id: 14,
        name: 'International Law',
        description: 'A community for topics on international treaties, war crimes, and global justice.',
        memberCount: 64000,
        avatarUrl: '/path/to/image14.jpg',
        tags: ['International Treaties', 'War Crimes', 'Global Justice', 'Diplomacy', 'International Courts']
      },
      {
        id: 15,
        name: 'Public Interest Law',
        description: 'A community dedicated to legal aid, public defenders, and social justice initiatives.',
        memberCount: 43000,
        avatarUrl: '/path/to/image15.jpg',
        tags: ['Legal Aid', 'Public Defenders', 'Social Justice', 'Nonprofits', 'Advocacy']
      },
      {
        id: 16,
        name: 'Legal Education and Careers',
        description: 'For students, graduates, and professionals to discuss law schools, exams, and career advice.',
        memberCount: 78000,
        avatarUrl: '/path/to/image16.jpg',
        tags: ['Law Schools', 'Bar Exam', 'Legal Careers', 'Internships', 'Networking']
      }
    ];
    
  // Extract unique tags from the communities array
  const allTags = Array.from(new Set(communities.flatMap(community => community.tags))).map(tag => ({
    value: tag,
    label: tag,
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-stone-50">
      <h2 className="text-lg font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            placeholder="what is the title ?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <input
            type="file"
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            onChange={handleFileChange}
          />
          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Selected preview"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Tag Selection Section */}
        <div className="mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-amber-600 text-stone-50 rounded-full px-3 py-1 m-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-amber-600 rounded-md text-stone-50 hover:bg-amber-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}

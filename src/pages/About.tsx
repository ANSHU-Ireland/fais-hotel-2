import { Users, Heart, Leaf, Trophy } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24">
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">Our Story</h1>
          <p className="text-2xl animate-fade-in-delay">A culinary journey in the heart of Dublin</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6 animate-slide-in-left">
              Pulari Restaurant opened its doors in 2015 with a simple vision: to bring authentic,
              high-quality cuisine to Dublin city centre while creating a warm, welcoming
              atmosphere that feels like home.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6 animate-slide-in-right">
              Founded by Chef Michael O'Brien, who trained in Michelin-starred restaurants across
              Europe, XYZ combines classical techniques with innovative flavors. Our menu
              celebrates the best of Irish produce, sourced from local farms and fishermen who
              share our commitment to quality and sustainability.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed animate-slide-in-left">
              Today, Pulari Restaurant continues to be a cornerstone of Dublin's dining scene,
              recognized for excellence in both food and service. We're proud to have served
              thousands of guests, from locals celebrating special occasions to visitors
              discovering the best of Irish hospitality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart size={48} />,
                title: 'Passion',
                description: 'Every dish is prepared with love and attention to detail',
              },
              {
                icon: <Leaf size={48} />,
                title: 'Sustainability',
                description: 'We source locally and minimize our environmental impact',
              },
              {
                icon: <Users size={48} />,
                title: 'Community',
                description: 'Supporting local producers and bringing people together',
              },
              {
                icon: <Trophy size={48} />,
                title: 'Excellence',
                description: 'Striving for perfection in every aspect of dining',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-amber-600 flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                image: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=600',
                name: 'Michael O\'Brien',
                role: 'Executive Chef',
                bio: '15 years of experience in Michelin-starred restaurants',
              },
              {
                image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=600',
                name: 'Sarah Murphy',
                role: 'Head Pastry Chef',
                bio: 'Award-winning pastry chef specializing in modern desserts',
              },
              {
                image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
                name: 'James Kelly',
                role: 'Sous Chef',
                bio: 'Passionate about seasonal Irish ingredients',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg mb-6 group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{member.name}</h3>
                <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

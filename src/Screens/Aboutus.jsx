import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to BrainChild!</h1>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
          <p className="mb-6">
            We envision a world where every child has access to quality education tailored to their needs and interests. Through innovative technology and dedicated educators, we strive to make learning accessible, enjoyable, and effective for students of all ages.
          </p>
          <h2 className="text-xl font-semibold mb-4">What Sets Us Apart</h2>
          <ul className="list-disc ml-6 mb-6">
            <li className="mb-2">Student-Centered Learning: Our platform offers personalized learning pathways, adaptive assessments, and interactive resources to support each student's unique learning journey.</li>
            <li className="mb-2">Parental Access and Engagement: We provide comprehensive parental access features, allowing parents to track their child's progress, set learning goals, and communicate with teachers and administrators seamlessly.</li>
            <li className="mb-2">Safe and Secure Environment: The safety and security of our users are paramount. We employ the latest technologies and best practices to ensure a safe online environment for students, teachers, and parents alike.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-4">Our Commitment to Excellence</h2>
          <p className="mb-6">
            At BrainChild, we are committed to excellence in education. We continuously strive to enhance our platform, incorporating feedback from students, parents, and educators to deliver the best possible learning experience.
          </p>
          <h2 className="text-xl font-semibold mb-4">Join Us in Empowering the Next Generation</h2>
          <p>
            Whether you're a student eager to explore new subjects, a parent seeking to support your child's learning journey, or an educator passionate about making a difference, we invite you to join us in empowering the next generation through education.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

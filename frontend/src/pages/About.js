import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3'>
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>
            Welcome to Our Blog
          </h1>
          <div className='text-md text-gray-600'>
            <p className='mb-6'>
              Welcome to our blog! Here at [Your Blog Name], we're passionate
              about sharing valuable insights, tips, and stories about [Your
              Blog Niche]. Whether you're a seasoned professional or just
              starting out, our goal is to provide you with engaging content
              that inspires, educates, and entertains.
            </p>

            <p className='mb-6'>
              Our team of writers consists of experts in [Your Blog Niche] who
              are dedicated to delivering high-quality articles that cover a
              wide range of topics. From tutorials and guides to industry news
              and trends, we've got you covered.
            </p>

            <p className='mb-6'>
              We believe in fostering a supportive and inclusive community
              where readers can connect, learn from each other, and share their
              experiences. So don't hesitate to leave comments, ask questions,
              and engage with other readers!
            </p>

            <p>
              Whether you're here to expand your knowledge, find inspiration,
              or simply enjoy some great reads, we hope you'll find our blog a
              valuable resource. Thank you for visiting, and we look forward to
              sharing this journey with you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
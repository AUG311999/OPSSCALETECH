import { ContactForm } from './contact-form';

export function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl text-gray-900 mb-3 lg:mb-6">
              Let's talk about your operation.
            </h2>
            
            <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-10 leading-relaxed">
              If you're looking to scale training, safety, or internal communication across a complex organization, we're happy to start a conversation.
            </p>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
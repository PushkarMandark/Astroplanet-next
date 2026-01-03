"use client";

import { MainLayout } from "@/components/templates/main-layout";

export default function ShipmentPolicyPage() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        Shipment Policy
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Fast and reliable shipping to deliver your products on time
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 prose prose-lg max-w-none">
                        <p className="lead text-lg text-muted-foreground mb-8">
                            At Astroeshop, we try to ship products quickly and ensure that the ordered products reach you on time. Below is the shipping policy of Astroeshop which depends on the shipping policy of Government of India.
                        </p>

                        <h2>Astroeshop Method of Shipping Products</h2>
                        <p>
                            We offer domestic (within India) and international shipping options to our members. We ensure that the Pujan Samagri product or service reaches our members on time through standard or express shipping options for domestic and international shipping. However, shipping methods may be unavailable for specific countries and products being shipped due to international shipping policies.
                        </p>

                        <h2>Shipping Time of Astroeshop</h2>

                        <div className="grid md:grid-cols-2 gap-6 my-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <h3 className="text-blue-900 mt-0">Domestic Shipping (India)</h3>
                                <ul className="text-blue-900">
                                    <li>Processing: 7-8 business days</li>
                                    <li>Delivery: 7-8 business days</li>
                                    <li>Total: Approx. 2-3 weeks</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                                <h3 className="text-purple-900 mt-0">International Shipping</h3>
                                <ul className="text-purple-900">
                                    <li>Processing: 7 business days</li>
                                    <li>Delivery: 3-4 weeks</li>
                                    <li>Total: Approx. 4-5 weeks</li>
                                </ul>
                            </div>
                        </div>

                        <p>
                            For products, domestic shipping takes 7-8 business days from the order date, including the charging process. Once shipped, estimated delivery time is 7-8 business days. For international shipping, we start the shipment 7 working days from the order date, including energizing the product. Estimated delivery time is between 3 and 4 weeks depending on destination.
                        </p>

                        <p>
                            Similarly, for special services, it takes 7 working days for the package/product to be shipped domestically after completing the full set of rituals in the package. Processing time may be slightly longer depending on receiving Prasad from sacred Powerspots during major special events or promotional periods. Thank you for your patience and understanding.
                        </p>

                        <p className="text-sm text-muted-foreground italic">
                            These are rough estimates and actual delivery time may vary due to customs delay or unforeseen circumstances.
                        </p>

                        <h2>Shipping Costs</h2>
                        <p>
                            Astroeshop calculates shipping costs based on product size (dimension), product weight and destination. Product shipping charges will be displayed at checkout before placing your order. If the product is part of the package and our member is eligible to get Prasad for services included in the package or for eligible Homas, we offer free shipping which will be mentioned on our website.
                        </p>

                        <p>
                            Astroeshop offers international shipping and we are not responsible for any delays or additional fees/duties/taxes incurred during the customs clearance process.
                        </p>

                        <h2>Order Tracking</h2>
                        <p>
                            You can track your order by clicking on the link provided to go to My Orders. Once your order has shipped, a tracking number will be visible on your order to track your shipment. The tracking information updated on the website / or sent via SMS depends on the information shared by the carrier. So be patient. Once you get your tracking number, please visit India Post official website and enter your tracking number to track your shipment.
                        </p>

                        <h2>Lost or Damaged Shipments</h2>
                        <p>
                            Please contact our customer support team via email (<a href="mailto:support@astroeshop.com">support@astroeshop.com</a>) in the event that your product package arrives damaged within 2 business days of receiving the product or is lost. We will initiate an investigation and work with the carrier to resolve the issue. In order to process your claim effectively, we may require relevant documentation, such as photos/video of product opening or a damaged goods log.
                        </p>

                        <h2>Customer Support</h2>
                        <p>
                            Please do not hesitate to contact our customer support team if you have any questions or need assistance with your shipment.
                        </p>

                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                            <ul className="mb-0">
                                <li>Email: <a href="mailto:support@astroeshop.com">support@astroeshop.com</a></li>
                                <li>Phone: <a href="tel:+919599686887">+91 9599686887</a> (India only)</li>
                                <li>Hours: Monday to Saturday, 9:30 AM to 6:30 PM IST</li>
                            </ul>
                        </div>

                        <h2 className="mt-8">Policy Update</h2>
                        <p>
                            Please note that this shipping policy is subject to change without notice. Any modifications or updates to Astroeshop&apos;s shipping rules will be communicated to our members via our website or email.
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

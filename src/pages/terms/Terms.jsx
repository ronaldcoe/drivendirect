import React from 'react'
import '../../styles/blocks/privacy.css'

export default function Privacy() {
  return (
    <div className='privacy'>
        <div className='privacy__wrap'>
            <div>
                <h1>Terms of Service</h1>
                <p>This Privacy Policy outlines how we collect, use, and safeguard the personal information of users who visit our website. We are committed to protecting the privacy and confidentiality of the information provided to us. By using our website, you agree to the practices described in this policy.</p>

                <h2 id='information'>1. Information Collection</h2>
                <p>1.1 Personal Information: When you visit our website, we may collect certain personal information from you, such as your name, email address, phone number, and the name of your dealership. This information is collected when you voluntarily submit it through our contact forms or when you register an account.</p>

                <h2 id='use'>2. Use of Information</h2>
                <p>2.1 Internal Use: We use the collected information to facilitate the listing and visibility of cars available for sale on our website. The personal information you provide is used to identify and contact you or your dealership in relation to the listed cars and potential transactions.</p>

                <p>2.2 Communication: We may use your email address and phone number to send you notifications, updates, and relevant communications regarding your listings or inquiries made by other dealers.</p>

                <h2 id='sharing'>3. Information Sharing</h2>
                <p>3.1 Limited Disclosure: We understand the importance of protecting your personal information. We do not sell, rent, or disclose your personal information to third parties for marketing purposes. However, we may share your information with other registered dealers interested in purchasing or contacting you regarding the listed cars.</p>

                <p>3.2 Legal Requirements: We may disclose your personal information if required to do so by law or in response to valid legal requests or governmental regulations.</p>

                <h2 id='data'>4. Data Security</h2>
                <p>4.1 Safeguarding Measures: We take appropriate measures to protect the security of your personal information. However, please note that no data transmission or storage over the Internet is completely secure. We cannot guarantee the absolute security of your information.</p>

                <h2 id='thirdparty'>5. Third-Party Links</h2>
                <p>5.1 External Websites: Our website may contain links to external websites that are not operated or controlled by us. We are not responsible for the privacy practices or the content of such websites. We encourage you to review the privacy policies of these external websites before providing any personal information.</p>

                <h2 id='childrenpolicy'>6. Children's Privacy</h2>
                <p>6.1 Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take appropriate steps to remove the information from our records.</p>

                <h2 id='updates'>7. Updates to the Privacy Policy</h2>
                <p>7.1 We reserve the right to modify or update this Privacy Policy at any time. Any changes made will be posted on this page with a revised "Last Updated" date. By continuing to use our website, you acknowledge and agree to the updated Privacy Policy.</p>

                <h2 id='contact'>8. Contact Information</h2>
                <p>8.1 If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us at [contact email].</p>
            </div>
            <div className='privacy__wrap__tablecontent'>
                <div className='privacy__wrap__tablecontent__sticky'>
                    <h3>Table of Content</h3>
                    <ul>
                        <li><a href="#information">1. Information Collection</a></li>
                        <li><a href="#use">2. Use of Information</a></li>
                        <li><a href="#sharing">3. Information Sharing</a></li>
                        <li><a href="#data">4. Data Security</a></li>
                        <li><a href="#thirdparty">5. Third-Party Links</a></li>
                        <li><a href="#childrenpolicy">6. Children's Privacy</a></li>
                        <li><a href="#updates">7. Updates to the Privacy Policy</a></li>
                        <li><a href="#contact">8. Contact Information</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

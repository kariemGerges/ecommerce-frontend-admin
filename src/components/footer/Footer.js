// import {
//     Heart,
//     Mail,
//     Headset,
//     Phone,
//     MapPin,
//     Facebook,
//     Twitter,
//     Instagram,
//     UserRoundPen,
//     Salad,
//     House,
//     MessageCircleQuestion,
//     ShoppingCart,
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Logo from '../Logo/Logo';
// import { useLoginAuth } from '../../context/AuthLoginContext';
// import { useAuth } from '../../context/AuthContext';



// const Footer = () => {

//     const { user } = useLoginAuth();
//     const { setIsAuthModalOpen } = useAuth();
    

//     const navLinks = [
//         { name: 'Home', path: '/', icon: <House className="w-4 h-4" /> },
//         { name: 'Products', path: '/products', icon: <Salad className="w-4 h-4" /> },
//         { name: 'About', path: '/about', icon: <MessageCircleQuestion className="w-4 h-4" /> },
//         { name: 'Contact', path: '/contact', icon: <Headset className="w-4 h-4" /> },
//         { name: `${user ? user.name : 'Sign In'}`, path: `${user ? '/profile' : '/'}`, icon: <UserRoundPen className="w-4 h-4" /> },
//         { name: 'Cart', path: '/cart', icon: <ShoppingCart className="w-4 h-4" /> },
//     ];
    
//     const groupedLinks = [];
//     for (let i = 0; i < navLinks.length; i += 3) {
//         groupedLinks.push(navLinks.slice(i, i + 3));
//     }

//     // const handleClick = () => {
//     //     user ? setIsAuthModalOpen(true) : setIsAuthModalOpen(false);
//     // }

//     return (
//         <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
//                     {/* Brand Section */}
//                     <div className="space-y-4">
//                         <Logo />
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                             Enjoy authentic Egyptian flavors
//                         </p>
//                         <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 group">
//                             <Heart
//                                 className="text-red-400 animate-pulse w-4 h-4 sm:w-5 sm:h-5"
//                             />
//                             <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
//                                 Try our delicious products today
//                             </span>
//                         </div>
//                     </div>

//                     {/* Contact Section */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Us</h4>
//                         <div className="space-y-3">
//                             <a
//                                 href="mailto:info@freshmart.com"
//                                 className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                             >
//                                 <Mail className="w-4 h-4" />
//                                 <span>info@freshmart.com</span>
//                             </a>
//                             <a
//                                 href="tel:+1234567890"
//                                 className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                             >
//                                 <Phone className="w-4 h-4" />
//                                 <span>+1 (234) 567-890</span>
//                             </a>
//                             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//                                 <MapPin className="w-4 h-4 flex-shrink-0" />
//                                 <span>123 Charity Lane, westfield, IN 46074</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Social Media Section */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Follow Us</h4>
//                         <div className="flex space-x-4">
//                             <a
//                                 href="https://www.facebook.com"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                                 aria-label="Facebook"
//                             >
//                                 <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </a>
//                             <a
//                                 href="https://www.twitter.com"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                                 aria-label="Twitter"
//                             >
//                                 <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </a>
//                             <a
//                                 href="https://www.instagram.com"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                                 aria-label="Instagram"
//                             >
//                                 <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </a>
//                         </div>
//                     </div>

//                     {/* Quick Links Section */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Links</h4>
//                         <div className="grid grid-cols-2 gap-4">
//                             {navLinks.map((link, index) => (
//                                 <Link
//                                     key={index}
//                                     to={link.path}
//                                     aria-label={link.label}
//                                     onClick={
//                                         link.name === 'Sign In' || link.name === 'Profile'
//                                             ? () => setIsAuthModalOpen(true)
//                                             : () => {}
//                                     }
//                                     className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                                 >
//                                     {link.icon}
//                                     <span>{link.name}</span>
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer Bottom */}
//                 <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
//                     <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                             &copy; {new Date().getFullYear()} Fresh Mart. All rights reserved.
//                         </p>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                             Made with <span className="text-red-400">❤️</span> by Kariem Gerges
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
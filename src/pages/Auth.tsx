import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bird, Lock, Mail, CreditCard, Infinity, Shield } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('Free');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      features: ['5,000 API calls/month', 'Basic support', 'Standard response time'],
      limit: '5k/month'
    },
    {
      name: 'Pro',
      price: '₹2,499',
      features: ['100,000 API calls/month', 'Priority support', 'Fast response time'],
      limit: '100k/month'
    },
    {
      name: 'Enterprise',
      price: '₹8,499',
      features: ['Unlimited API calls', '24/7 Support', 'Ultra-fast response time'],
      limit: 'Unlimited'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your authentication logic here
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('plan', selectedPlan);
      window.location.href = '/';
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-purple-400 to-pink-400">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-5xl w-full backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="p-2 bg-white rounded-full shadow-xl">
                <Bird className="h-12 w-12 text-indigo-600" />
              </div>
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                Kuruvi API
              </h1>
            </div>
            <p className="text-white text-xl font-medium drop-shadow">Secure & Powerful API Platform for Developers</p>
          </div>

          <div className="flex justify-center">
            <div className={`w-full ${!isLogin ? 'max-w-6xl' : 'max-w-md'}`}>
              <div className={`grid ${!isLogin ? 'md:grid-cols-[1fr,1.5fr] gap-8' : ''}`}>
                {/* Auth Form */}
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      {isLogin ? 'Welcome Back' : 'Get Started'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {isLogin ? 'Login to your account' : 'Create your account'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 relative group">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-indigo-400"
                            placeholder="you@example.com"
                            required
                          />
                          <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 relative group">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-indigo-400"
                            placeholder="••••••••"
                            required
                          />
                          <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>

                    {!isLogin && (
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-indigo-600" />
                          <p className="text-sm text-indigo-800">
                            Selected Plan: <strong>{selectedPlan}</strong>
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
                    >
                      {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                    </button>
                  </div>
                </div>

                {/* Pricing Plans - Only show during signup */}
                {!isLogin && (
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={`bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 ${
                          selectedPlan === plan.name 
                            ? 'border-indigo-500 shadow-indigo-200' 
                            : 'border-transparent'
                        } ${plan.name === 'Free' ? 'border-green-500 shadow-green-200' : ''}`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            {plan.name}
                            {plan.name === 'Free' && (
                              <span className="ml-2 text-sm text-green-500 font-normal">Recommended for new users</span>
                            )}
                          </h3>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">{plan.price}</span>
                            <span className="text-gray-500 ml-1">/month</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-gray-600 group">
                              <div className="h-5 w-5 mr-2 flex-shrink-0">
                                {plan.name === 'Enterprise' ? (
                                  <Infinity className="h-5 w-5 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                                ) : (
                                  <CreditCard className="h-5 w-5 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                                )}
                              </div>
                              <span className="group-hover:text-indigo-600 transition-colors duration-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
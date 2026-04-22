import React, { useState, useEffect } from 'react';
import { ChevronDown, BookOpen, CheckCircle2, Lightbulb, Code2, Zap, AlertCircle } from 'lucide-react';

export default function JavaStudyGuide() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizMode, setQuizMode] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const modules = [
    {
      name: 'Java Fundamentals',
      icon: '📚',
      topics: [
        {
          title: 'Features & Tokens',
          content: 'Java features: Platform Independent, Object-Oriented, Secure, Multithreaded, Robust, Dynamic, Simple. Tokens: Keywords, Identifiers, Literals, Operators, Separators.'
        },
        {
          title: 'Data Types',
          content: 'byte(1), short(2), int(4), long(8), float(4), double(8), char(2), boolean(1) - All primitives have default values'
        },
        {
          title: 'Variables & Operators',
          content: 'Local (no default), Instance (default value), Static (shared). Operators: Arithmetic, Relational, Logical, Bitwise, Assignment'
        },
        {
          title: 'Arrays & Loops',
          content: 'arr.length is property not method. for, while, do-while, enhanced for. Array is object, index starts from 0'
        }
      ]
    },
    {
      name: 'OOP Concepts',
      icon: '🎯',
      topics: [
        {
          title: 'Classes & Objects',
          content: 'Class is blueprint, Object is instance. Constructor initializes objects. new keyword allocates memory on heap'
        },
        {
          title: 'Constructors',
          content: 'Constructor name = Class name. No return type. Can be overloaded. this() calls another constructor. super() calls parent'
        },
        {
          title: 'Method Overloading',
          content: 'Same method name, different parameters (type/count/order). Return type alone NOT sufficient. Compile-time polymorphism'
        },
        {
          title: 'static & final',
          content: 'static: Class-level, shared by all objects. final: Cannot change/override/extend. final variables must be initialized'
        }
      ]
    },
    {
      name: 'Inheritance & Interfaces',
      icon: '🔗',
      topics: [
        {
          title: 'Inheritance Types',
          content: 'Single (one parent), Multilevel (chain), Hierarchical (multiple children). NO multiple inheritance - use interfaces instead'
        },
        {
          title: 'this & super Keywords',
          content: 'this: Current object. super: Parent class. super() must be first statement in constructor. this() calls same class constructor'
        },
        {
          title: 'Method Overriding',
          content: 'Same signature, child class implementation. Cannot override static/final methods. Runtime polymorphism. @Override annotation recommended'
        },
        {
          title: 'Interfaces & Packages',
          content: 'Interface: Contract, all methods abstract. Class implements multiple interfaces. Packages: Namespace, java.lang auto-imported'
        }
      ]
    },
    {
      name: 'Exception & Threading',
      icon: '⚡',
      topics: [
        {
          title: 'Exception Handling',
          content: 'Checked: IOException, SQLException (must catch/declare). Unchecked: RuntimeException (optional). try-catch-finally order'
        },
        {
          title: 'Multithreading',
          content: 'Extend Thread or implement Runnable. Call start() NOT run(). Thread.sleep() is static. synchronized for thread safety'
        },
        {
          title: 'Thread States',
          content: 'New → Runnable → Waiting/Blocked → Terminated. join() waits for thread. volatile for memory visibility'
        }
      ]
    },
    {
      name: 'JDBC & Servlets',
      icon: '🔌',
      topics: [
        {
          title: 'JDBC Steps',
          content: '1.Load Driver (Class.forName) 2.Connect (DriverManager.getConnection) 3.Statement 4.Execute 5.ResultSet 6.Close'
        },
        {
          title: 'PreparedStatement',
          content: 'Pre-compiled, prevents SQL injection. executeQuery() for SELECT, executeUpdate() for INSERT/UPDATE/DELETE'
        },
        {
          title: 'Servlet Lifecycle',
          content: 'init() → service(doGet/doPost) → destroy(). doGet for GET, doPost for POST. getParameter() for input, PrintWriter for output'
        }
      ]
    }
  ];

  const quizQuestions = [
    {
      q: 'How many primitive data types in Java?',
      options: ['6', '8', '10', '12'],
      answer: 1
    },
    {
      q: 'String comparison uses:',
      options: ['==', '.equals()', 'compareTo()', 'All above'],
      answer: 1
    },
    {
      q: 'Can a class extend multiple classes?',
      options: ['Yes', 'No', 'Only 2', 'With interface'],
      answer: 1
    },
    {
      q: 'static method can access:',
      options: ['Instance var', 'static var', 'Both', 'Neither'],
      answer: 1
    },
    {
      q: 'Call thread execution method:',
      options: ['run()', 'start()', 'execute()', 'begin()'],
      answer: 1
    },
    {
      q: 'JDBC first step:',
      options: ['Connect', 'Load Driver', 'Statement', 'Execute'],
      answer: 1
    },
    {
      q: 'Array property (not method):',
      options: ['.length()', '.size()', '.length', '.count()'],
      answer: 2
    },
    {
      q: 'Constructor name must match:',
      options: ['Method', 'Class name', 'Interface', 'Package'],
      answer: 1
    },
    {
      q: 'finally block executes:',
      options: ['Only on error', 'Always', 'Never', 'Sometimes'],
      answer: 1
    },
    {
      q: 'Interface methods in Java 8+:',
      options: ['Only abstract', 'Abstract+default', 'Abstract+static+default', 'All implementations'],
      answer: 2
    }
  ];

  const toggleQuestion = (key) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) correct++;
    });
    return correct;
  };

  const startQuiz = () => {
    setQuizMode(true);
    setSelectedAnswers({});
    setShowScore(false);
  };

  const submitQuiz = () => {
    setShowScore(true);
  };

  const currentTopic = modules[activeModule]?.topics[activeTopic];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                TS ECET Java Guide
              </h1>
            </div>
            <p className="text-slate-400 text-lg">Complete Java Programming Study for MCQ Excellence</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Modules */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden sticky top-24">
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-slate-700">
                  <h2 className="font-bold text-white text-lg">Modules</h2>
                </div>
                <div className="divide-y divide-slate-700">
                  {modules.map((mod, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveModule(idx);
                        setActiveTopic(0);
                      }}
                      className={`w-full text-left px-4 py-3 transition-all duration-300 ${
                        activeModule === idx
                          ? 'bg-blue-500/30 border-l-4 border-blue-400 text-blue-300'
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{mod.icon}</span>
                        <span className="text-sm font-semibold">{mod.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {!quizMode ? (
                <>
                  {/* Topics */}
                  <div className="mb-8">
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden mb-6">
                      <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-slate-700">
                        <h2 className="font-bold text-2xl text-white flex items-center gap-2">
                          <span className="text-3xl">{modules[activeModule]?.icon}</span>
                          {modules[activeModule]?.name}
                        </h2>
                        <p className="text-slate-400 mt-1">Learn core concepts and key points</p>
                      </div>

                      <div className="p-6 space-y-4">
                        {modules[activeModule]?.topics.map((topic, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTopic(idx)}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 ${
                              activeTopic === idx
                                ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400'
                                : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                            }`}
                          >
                            <h3 className="font-bold text-lg text-white">{topic.title}</h3>
                            <p className="text-slate-400 text-sm mt-1 truncate">{topic.content.substring(0, 60)}...</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Topic Details */}
                  {currentTopic && (
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden">
                      <div className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-slate-700">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                          <Lightbulb className="w-6 h-6 text-yellow-400" />
                          {currentTopic.title}
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">{currentTopic.content}</p>
                        
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                          <p className="text-blue-300 text-sm"><strong>MCQ Tip:</strong> Focus on terminology, defaults, and method signatures when solving questions</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quiz Button */}
                  <button
                    onClick={startQuiz}
                    className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                  >
                    <Zap className="w-6 h-6" />
                    Start MCQ Quiz (10 Questions)
                  </button>
                </>
              ) : (
                /* Quiz Mode */
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-slate-700">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Code2 className="w-6 h-6 text-green-400" />
                      MCQ Practice Quiz
                    </h3>
                    <p className="text-slate-400 mt-1">Question {currentQuizIndex + 1} of {quizQuestions.length}</p>
                  </div>

                  <div className="p-8">
                    {!showScore ? (
                      <>
                        {/* Progress Bar */}
                        <div className="mb-8">
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Question */}
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-white mb-6">{quizQuestions[currentQuizIndex].q}</h4>
                          
                          <div className="space-y-3">
                            {quizQuestions[currentQuizIndex].options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAnswerSelect(currentQuizIndex, idx)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                                  selectedAnswers[currentQuizIndex] === idx
                                    ? 'bg-blue-500/30 border-blue-400'
                                    : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    selectedAnswers[currentQuizIndex] === idx
                                      ? 'bg-blue-500 border-blue-400'
                                      : 'border-slate-500'
                                  }`}>
                                    {selectedAnswers[currentQuizIndex] === idx && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                  </div>
                                  <span className="text-slate-300">{option}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-4">
                          <button
                            onClick={() => setCurrentQuizIndex(Math.max(0, currentQuizIndex - 1))}
                            disabled={currentQuizIndex === 0}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition-all"
                          >
                            ← Previous
                          </button>
                          
                          {currentQuizIndex === quizQuestions.length - 1 ? (
                            <button
                              onClick={submitQuiz}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
                            >
                              Submit Quiz
                            </button>
                          ) : (
                            <button
                              onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
                            >
                              Next →
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      /* Score Display */
                      <div className="text-center py-8">
                        <div className="mb-6">
                          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                            {calculateScore()}/{quizQuestions.length}
                          </div>
                          <p className="text-xl text-slate-300">
                            {calculateScore() >= 8 ? '🎉 Excellent!' : calculateScore() >= 6 ? '👍 Good Job!' : '📚 Keep Practicing!'}
                          </p>
                        </div>

                        <div className="bg-slate-700/50 rounded-xl p-6 mb-6 text-left">
                          <h4 className="font-bold text-white mb-4">Review Your Answers:</h4>
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {quizQuestions.map((q, idx) => (
                              <div key={idx} className="text-sm">
                                <p className="text-slate-400">Q{idx + 1}: {q.q}</p>
                                <p className={selectedAnswers[idx] === q.answer ? 'text-green-400' : 'text-red-400'}>
                                  Your answer: {q.options[selectedAnswers[idx]]} {selectedAnswers[idx] === q.answer ? '✓' : '✗'}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              setQuizMode(false);
                              setCurrentQuizIndex(0);
                              setSelectedAnswers({});
                              setShowScore(false);
                            }}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
                          >
                            Back to Study
                          </button>
                          <button
                            onClick={() => {
                              setCurrentQuizIndex(0);
                              setSelectedAnswers({});
                              setShowScore(false);
                            }}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-slate-400 text-sm">
            <p>📚 TS ECET Java Programming Study Guide | Master these concepts for MCQ success! 🎯</p>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

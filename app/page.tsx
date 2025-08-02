'use client';
import { HomeIcon, Settings, User, Heart, ChevronRight, Plus, Bell, Search, MessageCircle, Share, MapPin, Clock, Menu, X, Star } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { desc, h1 } from 'framer-motion/client';

// ===================================================
// 型定義
// ===================================================
type Post = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number; // いいねの数を追加
  comments: number; // コメントの数を追加
  location: string; // 投稿の場所を追加
};

// タブの型定義
type Tab = {
  id: TabId;
  label: string;
  icon: React.ElementType;
};

// 機能カードの型定義
type feature = {
  icon: string;
  title: string;
  desc: string;
};

// タブのユニオン
type TabId = 'home' | 'profile' | 'settings';

export default function Home() {

  // ====================================================
  // 状態管理
  // ====================================================
  // タブの状態を管理するためのuseStateフック
  const [activeTab, setActiveTab] = useState<TabId>('home');
  // いいねしたidを管理するためのuseStateフック
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  // 通知数を管理するためのuseStateフック
  const [notifications, setNotifications] = useState<number>(3);
  // メニューの開閉状態を管理するためのuseStateフック
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // モーダル表示の状態を管理するためのuseStateフック
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // タブの配列データ
  const tabs: Tab[] = [
    { id: 'home', label: 'ホーム', icon: HomeIcon },
    { id: 'profile', label: 'プロフィール', icon: User },
    { id: 'settings', label: '設定', icon: Settings },
  ];

  // テスト投稿データ
  const posts: Post[] = [
    {
      id: 1,
      author: '田中太郎',
      avatar: '👨‍💻',
      content: 'Next.js 15の新機能を試してみました！Turbopackのおかげで開発が爆速になりました。',
      time: '2時間前',
      likes: 12,
      comments: 3,
      location: '東京, 日本',
    },
    {
      id: 2,
      author: '佐藤花子',
      avatar: '👩‍🎨',
      content: 'Framer Motionでアニメーションを実装するのが楽しすぎる！UIがぐっと魅力的になりますね。',
      time: '5時間前',
      likes: 25,
      comments: 8,
      location: '大阪, 日本',
    },
    {
      id: 3,
      author: '山田次郎',
      avatar: '🧑‍🚀',
      content: 'Supabaseを使ったリアルタイム機能の実装が完了！認証もあっという間にセットアップできました。',
      time: '1日前',
      likes: 18,
      comments: 5,
      location: '福岡, 日本',
    }
  ];

  // 機能カードのデータ
  const features: feature[] = [
    { icon: "🚀", title: "高速開発", desc: "Turbopackによる爆速ビルド" },
    { icon: "🎨", title: "美しいUI", desc: "Tailwind CSSとFramer Motion" },
    { icon: "🔐", title: "認証機能", desc: "Supabase認証システム" },
    { icon: "📱", title: "レスポンシブ", desc: "モバイルファーストデザイン" }
  ];

  // いいねボタンのクリックハンドラー
  const handleLike = (postId: number): void => {
    setLikedPosts((prev) => {  // prev: 既存のいいねの状態を更新
      const newLikes = new Set(prev);  // 新しいSetを作成（直接更新したらいけないため）
      if (newLikes.has(postId)) {
        newLikes.delete(postId); // 既にいいねしている場合は解除
        console.log(`Post ${postId} のいいねを解除しました`);
      } else {
        newLikes.add(postId); // いいねしていない場合は追加
        console.log(`Post ${postId} にいいねしました`);
      }
      return newLikes;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className='bg-white shadow-sm p-4'
      >
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-between items-center'>
            {/* 左側：アプリ名 */}
            <div className='flex items-center space-x-2'>
              <motion.div
                whileHover={{
                  rotate: 180
                }}
                transition={{
                  duration: 0.3
                }}
                className='
                  text-2xl
                  font-bold
                  text-blue-600
                '
              >
                🦜
              </motion.div>
              <h1 className='text-xl font-bold'>ParrotProgress</h1>
            </div>

            {/* 右側：ナビゲーションボタン */}
            <nav className='hidden md:flex space-x-4'>
              {/* タブボタンを配置 */}
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={tab.id}
                    onClick={(): void => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    <Icon className='w-5 h-5' />
                    <span>{tab.label}</span>
                  </motion.button>
                )
              })}

              {/* 通知ボタンを追加 */}
              <motion.button 
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                className='
                  relative 
                  p-2 
                  text-gray-600 hover:bg-gray-100 
                  rounded-lg'
              >
                <Bell className='w-6 h-6' />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='
                    absolute 
                    -top-1 -right-1 
                    bg-red-500 text-white 
                    text-xs 
                    rounded-full 
                    w-5 h-5 
                    flex items-center justify-center
                  '
                >
                  {notifications}
                </motion.span>
              </motion.button> 

              {/* 検索アイコンを追加 */}
              <motion.button 
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                className='
                  p-2 
                  text-gray-600 hover:bg-gray-100 
                  rounded-lg
                '
              >
                <Search className='w-6 h-6' />
              </motion.button>
            </nav>

            {/* ハンバーガーメニュー */}
            <button 
              onClick={(): void => setIsMenuOpen(!isMenuOpen)} 
              className='md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg'
            >
              <Menu className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ 
                opacity: 0, 
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}
              transition={{
                duration: 0.3
              }}
              className='
                md:hidden 
                bg-white 
                border-t border-gray-200
              '
            >
              <div className='px-4 py-2 space-y-2'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='font-semibold'>メニュー</span>
                  <button 
                    onClick={(): void => setIsMenuOpen(false)}
                    className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
                {/* タブボタンをモバイルメニューに配置 */}
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button 
                      key={tab.id}
                      initial={{
                        opacity: 0,
                        x: -20
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={(): void => {
                        setActiveTab(tab.id);
                        setIsMenuOpen(false); // メニューを閉じる
                      }}
                      className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg ${
                        activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`
                      }
                    >
                      <Icon className='w-5 h-5' />
                      <span>{tab.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.header>

      <main className='max-w-4xl mx-auto px-4 py-8'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && (
              <div className='space-y-6'>
                {(() => {
                  // アニメーション変数
                  {/* コンテナのアニメーション変数 */}
                  const containerVariants = {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        staggerChildren: 0.1,
                      },
                    },
                  };
                  {/* 投稿カードのアニメーション変数 */}
                  const itemVariants = {
                    hidden: { 
                      opacity: 0
                    },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.5 },
                    },
                  };

                  return (
                    <motion.div
                      variants={containerVariants}
                      initial='hidden'
                      animate='visible'
                      className='space-y-6'
                    >
                      {/* Welcomeカード */}
                      <motion.div 
                        variants={itemVariants}
                        initial='hidden'
                        animate='visible'
                        className='bg-blue-600 text-white p-8 rounded-2xl'
                      >
                        <h1 className='text-3xl font-bold'>Next.js学習アプリへようこそ! 🎉</h1>
                        <p className='text-lg opacity-90'>モダンなReact開発の世界を体験しましょう</p>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(): void => setIsModalOpen(true)}
                          className='mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors font-bold'>
                          詳細を見る
                        </motion.button>
                      </motion.div>

                      {/* 機能カードセクション */}
                      <motion.div
                        variants={itemVariants}
                        initial='hidden'
                        animate='visible'
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {features.map((feature, index) => (
                          <motion.div
                            key={index}
                            whileHover={{
                              scale: 1.02,
                              y: -5
                            }}
                            className='
                              bg-white
                              p-6
                              rounded-xl
                              shadow-lg
                              border
                              border-gray-100
                            '
                          >
                            <div>{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* 既存の投稿一覧 */}
                      {posts.map((post) => (
                        <motion.div 
                          key={post.id} 
                          variants={itemVariants}
                          whileHover={{ scale: 1.01 }}
                          className='bg-white p-6 rounded-lg shadow-lg border border-gray-100'
                        >
                          <div className='flex space-x-3'>
                            <div> 
                              {post.avatar}
                            </div>
                            <div>
                              <h3 className='font-semibold'>{post.author}</h3>
                              <div className='flex items-center text-gray-500 text-sm'>
                                <Clock className='w-4 h-4 mr-1' />
                                {post.time}
                              </div>
                              <div className='flex items-center text-gray-500 text-sm mt-1'>
                                <MapPin className='w-4 h-4 mr-1' />
                                {post.location}
                              </div>
                              <p className='text-gray-800 mt-1'>{post.content}</p>
                              {/* ボタン系 */}
                              <div className='mt-3 flex space-x-6'>
                                {/* いいね */}
                                <motion.button 
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(): void => handleLike(post.id)}
                                  className={`flex items-center space-x-2 ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-400`}
                                >
                                  <Heart className={`w-5 h-5 ${
                                    likedPosts.has(post.id) ? 'fill-current' : ''
                                  }`} />
                                  <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                                </motion.button>
                                {/* コメント */}
                                <button className='flex items-center space-x-2 text-gray-500 hover:text-blue-500'>
                                  <MessageCircle className='w-5 h-5' />
                                  <span>{post.comments}</span>
                                </button>
                                {/* シェアボタン */}
                                <button className='flex items-center space-x-2 text-gray-500 hover:text-green-500'>
                                  <Share className='w-5 h-5' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div> 
                  );
                })()}
              </div>
            )}

            {activeTab === 'profile' && (
              (() => {
                
                // アニメーション変数
                const itemVariants = {
                  hidden: {
                    y: 20,  // 下から
                    opacity: 0  // 完全に透明
                    
                  },
                  visible: {
                    y: 0,  // 元の位置
                    opacity: 1,  // 不透明
                    transition: {
                      duration: 0.5  // アニメーションにかける時間
                    }
                  }
                }

                return (
                  <div className='space-y-6'>
                    {/* 統計情報を追加 */}
                    <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100'>
                      <div className='text-center'>
                        <div className='text-6xl mb-4'>👨‍💻</div>
                        <h2 className='text-2xl font-bold mb-2'>開発者プロフィール</h2>
                        <p className='text-gray-600 mb-6'>Next.js愛好家 | React開発者</p>
                        <div className='grid grid-cols-3 gap-4 text-center'>
                          <div>
                            <div className='text-2xl font-bold text-blue-600'>42</div>
                            <div className='text-gray-500'>投稿</div>
                          </div>
                          <div>
                            <div className='text-2xl font-bold text-green-600'>1.2k</div>
                            <div className='text-gray-500'>フォロワー</div>
                          </div>
                          <div>
                            <div className='text-2xl font-bold text-purple-600'>256</div>
                            <div className='text-gray-500'>いいね</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* スキルバー */}
                    <motion.div 
                      variants={itemVariants}
                      initial="hidden"  // itemVariantsで定義した「hidden」を使用
                      animate="visible" // itemVariantsで定義した「visible」を使用
                      className='bg-white p-6 rounded-xl shadow-lg border border-gray-100'
                    >
                      <h1 className='text-xl font-semibold mb-4'>スキル</h1>
                      <div className='space-y-3'>
                        {([
                          { name: 'Next.js', level: '90' },
                          { name: 'React', level: '95' },
                          { name: 'TypeScript', level: '85' },
                          { name: 'Tailwind CSS', level: '80' },
                        ]).map((skill, index) => (
                          <>
                            <div key={index} className='flex justify-between mb-1'>
                              <span className='font-bold'>{skill.name}</span>
                              <span className='text-gray-500'>{skill.level}%</span>
                            </div>
                            <div>
                              <div className='bg-gray-200 rounded-full h-2'>
                                <motion.div 
                                  initial={{width: 0}}
                                  animate={{width: `${skill.level}%`}}
                                  transition={{duration: 1, delay: index * 0.2}}
                                  className={`bg-blue-500 rounded-full h-2`}>
                                </motion.div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )
              })()
            )}

            {activeTab === 'settings' && (
              <div className='space-y-6'>
                <div className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100'>
                  <h2 className='text-2xl font-bold mb-6'>設定</h2>
                  <div className='space-y-4'>
                    <motion.div 
                      whileHover={{
                        x: 5,
                        backgroundColor: '#dbeafe'
                      }}
                      className='
                        flex items-center justify-between 
                        p-4 
                        border border-gray-200 
                        rounded-lg 
                        cursor-pointer
                      '
                    >
                      <div>
                        <h3 className='font-semibold'>通知設定</h3>
                        <p className='text-gray-600 text-sm'>プッシュ通知とメール通知の管理</p>
                      </div>
                      <div>
                        <ChevronRight className='w-5 h-5 text-gray-500' />
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{
                        x: 5,
                        backgroundColor: '#dbeafe'
                      }}
                      className='
                        flex items-center justify-between 
                        p-4 
                        border border-gray-200 
                        rounded-lg 
                        cursor-pointer
                      '
                    >
                      <div>
                        <h3 className='font-semibold'>プライバシー</h3>
                        <p className='text-gray-600 text-sm'>アカウントの公開範囲設定</p>
                      </div>
                      <div>
                        <ChevronRight className='w-5 h-5 text-gray-500' />
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{
                        x: 5,
                        backgroundColor: '#dbeafe'
                      }}
                      className='
                        flex items-center justify-between 
                        p-4 
                        border border-gray-200 
                        rounded-lg 
                        cursor-pointer
                      '
                    >
                      <div>
                        <h3 className='font-semibold'>テーマ</h3>
                        <p className='text-gray-600 text-sm'>ダークモード・ライトモードの切り替え</p>
                      </div>
                      <div>
                        <ChevronRight className='w-5 h-5 text-gray-500' />
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{
                        x: 5,
                        backgroundColor: '#dbeafe'
                      }}
                      className='
                        flex items-center justify-between 
                        p-4 
                        border border-gray-200 
                        rounded-lg 
                        cursor-pointer
                      '
                    >
                      <div>
                        <h3 className='font-semibold'>言語</h3>
                        <p className='text-gray-600 text-sm'>表示言語の変更</p>
                      </div>
                      <div>
                        <ChevronRight className='w-5 h-5 text-gray-500' />
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{
                        x: 5,
                        backgroundColor: '#dbeafe'
                      }}
                      className='
                        flex items-center justify-between 
                        p-4 
                        border border-gray-200 
                        rounded-lg 
                        cursor-pointer
                      '
                    >
                      <div>
                        <h3 className='font-semibold'>データ同期</h3>
                        <p className='text-gray-600 text-sm'>クラウドバックアップの設定</p>
                      </div>
                      <div>
                        <ChevronRight className='w-5 h-5 text-gray-500' />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* モーダル */}
      <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
              onClick={(): void => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e): void => e.stopPropagation()}
                className='bg-white rounded-2xl p-8 max-w-md w-full'
              >
                <div className='text-center'>
                  <div className='text-4xl mb-4'>🎯</div>
                  <h2 className='text-2xl font-bold mb-4'>Next.js学習の特徴</h2>
                  <div className='text-left space-y-4 mb-6'>
                    
                    <div className='flex items-start space-x-3'>
                      <Star className='h-5 w-5 text-yellow-500 mt-0.5' />
                      <div>
                        <h3 className='font-semibold'>実践的な学習</h3>
                        <p className='text-gray-600 text-sm'>実際のプロジェクトで使用される技術スタック</p>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <Star className='h-5 w-5 text-yellow-500 mt-0.5' />
                      <div>
                        <h3 className='font-semibold'>モダンな開発体験</h3>
                        <p className='text-gray-600 text-sm'>最新のReact機能とNext.js 15</p>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <Star className='h-5 w-5 text-yellow-500 mt-0.5' />
                      <div>
                        <h3 className='font-semibold'>美しいUI/UX</h3>
                        <p className='text-gray-600 text-sm'>Framer MotionとTailwind CSS</p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(): void => setIsModalOpen(false)}
                    className='mt-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors font-bold'
                  >
                    閉じる
                  </motion.button>

                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>


      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={():void => console.log('新規投稿ボタンがクリックされました')}
        className='fixed bottom-6 right-6 text-white p-4 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700 transition-colors'
      >
        <Plus />
      </motion.button>

    </div>
  );
}

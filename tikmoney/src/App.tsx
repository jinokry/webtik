import React, { useState } from 'react';
import { Download, AlertCircle, Video, Check } from 'lucide-react';

interface DownloadResponse {
  url: string;
  title: string;
  author: string;
  downloadUrl: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadData, setDownloadData] = useState<DownloadResponse | null>(null);
  const [format, setFormat] = useState<'mp4' | 'mp3'>('mp4');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDownloadData(null);
    
    try {
      // Mock response for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockData = {
        url: url,
        title: 'サンプルTikTok動画',
        author: '@example',
        downloadUrl: `https://example.com/video.${format}`,
      };
      setDownloadData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'リクエストの処理中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const isValidTikTokUrl = (url: string) => {
    return url.includes('tiktok.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Top Ad Banner */}
        <div className="bg-gray-200 p-6 mb-8 text-center rounded-lg">
          <span className="text-gray-600 font-medium">広告</span>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Video className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TikTok動画ダウンローダー
          </h1>
          <p className="text-lg text-gray-600">
            TikTok動画を簡単・高速にダウンロード
          </p>
        </div>

        {/* Sidebar Ad */}
        <div className="lg:flex gap-8">
          <div className="hidden lg:block w-64 space-y-4">
            <div className="bg-gray-200 p-40 rounded-lg text-center">
              <span className="text-gray-600">広告</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="tiktok-url" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    TikTok動画のURL
                  </label>
                  <div className="relative">
                    <input
                      id="tiktok-url"
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="TikTok動画のURLを貼り付けてください"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition
                        ${isValidTikTokUrl(url) ? 'border-green-500 pr-10' : 'border-gray-300'}
                      `}
                      required
                    />
                    {isValidTikTokUrl(url) && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    フォーマット
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="mp4"
                        checked={format === 'mp4'}
                        onChange={(e) => setFormat(e.target.value as 'mp4')}
                        className="mr-2"
                      />
                      MP4動画
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="mp3"
                        checked={format === 'mp3'}
                        onChange={(e) => setFormat(e.target.value as 'mp3')}
                        className="mr-2"
                      />
                      MP3音声
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !isValidTikTokUrl(url)}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition
                    ${loading || !isValidTikTokUrl(url)
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      処理中...
                    </span>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      ダウンロード
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {downloadData && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{downloadData.title}</h3>
                    <span className="text-sm text-gray-600">{downloadData.author}</span>
                  </div>
                  <a
                    href={downloadData.downloadUrl}
                    download
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    今すぐダウンロード
                  </a>
                </div>
              )}
            </div>

            {/* In-Content Ad */}
            <div className="bg-gray-200 p-6 mb-8 text-center rounded-lg">
              <span className="text-gray-600">広告</span>
            </div>
          </div>
        </div>

        {/* Bottom Ad Banner */}
        <div className="bg-gray-200 p-6 mt-8 text-center rounded-lg">
          <span className="text-gray-600">広告</span>
        </div>

        {/* Legal Disclaimer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p className="mb-2">
            ⚠️ このツールは個人使用のみを目的としています。本サービスを利用することで、利用規約に同意したものとみなされます。
          </p>
          <p>
            コンテンツのダウンロードと使用に関する権利を確認してください。
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
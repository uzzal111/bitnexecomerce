'use client';

import { useState } from 'react';
import { FiArrowUp, FiCopy, FiCheck, FiClock, FiInfo, FiGift, FiAlertTriangle } from 'react-icons/fi';
import Link from 'next/link';

export default function DepositPage() {
  const [txId, setTxId] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedTxId, setCopiedTxId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const walletAddress = 'TNPdZ4pJcG9WJfVZ8Jk7vL5mRtNxY8zX9B';
  const network = 'TRC20';
  const minDeposit = 30;
  const qrCodeImage = '/images/deposit-qr-code.png';

  const depositHistory = [
    { id: '1', amount: 50, status: 'Completed', date: '2023-06-15 14:30', txId: '0x1234567890abcdef1234567890abcdef1234567890abcdef' },
    { id: '2', amount: 100, status: 'Pending', date: '2023-06-14 09:15', txId: '0x9876543210fedcba9876543210fedcba9876543210fedcba' },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyTxId = (txId: string) => {
    navigator.clipboard.writeText(txId);
    setCopiedTxId(txId);
    setTimeout(() => setCopiedTxId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId) {
      alert('Please enter your Transaction ID');
      return;
    }
    
    alert(`Deposit submitted!\nTX ID: ${txId}\n\nYour deposit will be processed after network confirmation.`);
    setTxId('');
  };

  const formatTxId = (txId: string) => {
    return `${txId.substring(0, 6)}...${txId.substring(txId.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <Link href="/asset" className="inline-flex items-center text-sm text-white/80 hover:text-white mb-2">
                  <FiArrowUp className="rotate-90 mr-1" /> Back to Wallet
                </Link>
                <h1 className="text-2xl font-bold">Deposit USDT ({network})</h1>
                <p className="text-white/90 mt-1">Secure and fast deposits</p>
              </div>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                aria-label="Transaction history"
              >
                <FiClock />
              </button>
            </div>
          </div>

          {/* Transaction History Panel */}
          {showHistory && (
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <FiClock className="mr-2 text-indigo-500" /> Deposit History
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {depositHistory.map(deposit => (
                  <div key={deposit.id} className="border-b border-gray-200 pb-3 last:border-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">${deposit.amount} USDT</p>
                        <p className="text-xs text-gray-500">{deposit.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          deposit.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {deposit.status}
                        </span>
                        <div className="flex items-center justify-end mt-1">
                          <p className="text-xs text-gray-500">{formatTxId(deposit.txId)}</p>
                          <button 
                            onClick={() => handleCopyTxId(deposit.txId)}
                            className="text-gray-400 hover:text-gray-600 ml-1 p-1 rounded-full hover:bg-gray-200 transition"
                            title="Copy full TX ID"
                          >
                            {copiedTxId === deposit.txId ? (
                              <FiCheck className="text-green-500" size={12} />
                            ) : (
                              <FiCopy size={12} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6">
            {/* QR Code Section */}
            <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-center border border-indigo-100">
              <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src={qrCodeImage} 
                  alt="Deposit QR Code" 
                  className="w-full h-full object-contain rounded-md shadow-inner"
                />
              </div>
              <p className="text-sm text-indigo-700 font-medium">Scan QR code to deposit</p>
            </div>

            {/* Wallet Address */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Your {network} Deposit Address
              </label>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                <p className="text-sm font-mono truncate">{walletAddress}</p>
                <button 
                  onClick={handleCopyAddress}
                  className="text-indigo-600 hover:text-indigo-800 ml-2 p-1.5 rounded-full hover:bg-indigo-50 transition"
                  title="Copy to clipboard"
                  aria-label="Copy wallet address"
                >
                  {copiedAddress ? <FiCheck className="text-green-500" /> : <FiCopy />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-start">
                <FiInfo className="mr-1.5 mt-0.5 flex-shrink-0" />
                <span>Only send {network} USDT to this address. Sending other assets may result in permanent loss.</span>
              </p>
            </div>

            {/* Transaction Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Transaction ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Hash (TXID)
                </label>
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="Paste your transaction hash here"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white hover:border-indigo-300 transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-2 flex items-start">
                  <FiInfo className="mr-1.5 mt-0.5 flex-shrink-0" />
                  <span>Find this in your wallet's transaction history after sending USDT</span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!txId}
                className={`w-full py-3.5 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg ${
                  !txId ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Confirm Deposit
              </button>
            </form>

            {/* Security & Information Section */}
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 flex items-center mb-2">
                  <FiInfo className="mr-2 flex-shrink-0" /> Deposit Guidelines
                </h4>
                <ul className="text-xs text-blue-700 space-y-1.5">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1.5 mt-0.5">•</span>
                    <span><span className="font-semibold">Minimum deposit:</span> ${minDeposit} USDT</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1.5 mt-0.5">•</span>
                    <span><span className="font-semibold">Network:</span> {network} only (TRC20 network)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1.5 mt-0.5">•</span>
                    <span><span className="font-semibold">Processing time:</span> 1-3 network confirmations (~5-15 minutes)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100">
                <h4 className="text-sm font-medium text-amber-800 flex items-center mb-2">
                  <FiAlertTriangle className="mr-2 flex-shrink-0" /> Security Notice
                </h4>
                <ul className="text-xs text-amber-700 space-y-1.5">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1.5 mt-0.5">•</span>
                    <span>Never send USDT from exchange wallets directly. Withdraw to your private wallet first.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1.5 mt-0.5">•</span>
                    <span>Double-check the network before sending. We only support {network}.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1.5 mt-0.5">•</span>
                    <span>For large deposits, consider sending a small test amount first.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-50/80 rounded-lg border border-green-100">
                <h4 className="text-sm font-medium text-green-800 flex items-center mb-2">
                  <FiGift className="mr-2 flex-shrink-0" /> Bonus Information
                </h4>
                <ul className="text-xs text-green-700 space-y-1.5">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-1.5 mt-0.5">•</span>
                    <span><span className="font-semibold">5% bonus</span> on deposits over $100 USDT</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-1.5 mt-0.5">•</span>
                    <span>Bonuses are credited automatically after deposit confirmation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-1.5 mt-0.5">•</span>
                    <span>Bonus amounts are subject to terms and conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
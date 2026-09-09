"use client";

import { useState } from "react";
import { X, CreditCard, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

interface PaymentModalProps {
  campaignId: string;
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ campaignId, amount, isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, amount })
      });

      const data = await res.json();
      if (data.success) {
        setCompleted(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {completed ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
            <p className="mt-1 text-xs text-gray-500">${amount} transferred to Naano Escrow.</p>
            <p className="mt-4 text-xs font-semibold text-emerald-700">Activating campaign & notifying creators...</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Stripe Escrow Checkout</h3>
                <p className="text-xs text-gray-500">Naano Secure Payment System</p>
              </div>
            </div>

            <form onSubmit={handleStripeCheckout} className="mt-6 space-y-4">
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Campaign Budget Deposit</span>
                  <span>100% Escrow</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-gray-900">Total Due Now</span>
                  <span className="text-2xl font-black text-gray-900">${amount}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Card Number (Simulated)
                </label>
                <input
                  type="text"
                  readOnly
                  value="•••• •••• •••• 4242"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-mono text-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Expiry</label>
                  <input
                    type="text"
                    readOnly
                    value="12/28"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-mono text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">CVC</label>
                  <input
                    type="text"
                    readOnly
                    value="888"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-mono text-gray-700"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-blue-50/50 p-3 text-[11px] text-blue-800">
                <Lock className="h-4 w-4 shrink-0 text-blue-600" />
                Your payment is safely held in escrow until you review and approve creator content.
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-full bg-[#17181C] py-3 text-sm font-bold text-white transition hover:bg-black/80 shadow-lg disabled:opacity-50"
              >
                {processing ? "Confirming with Stripe..." : `Pay $${amount} via Stripe`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

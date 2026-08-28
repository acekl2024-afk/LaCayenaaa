import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MeatDoneness, SpiceLevel, SelectedCustomizations } from '../types';
import { X, Flame, Plus, Minus, Check, AlertCircle } from 'lucide-react';

export const DishCustomizationModal: React.FC = () => {
  const { 
    language, 
    customizingItem, 
    customizationTarget, 
    closeCustomizationModal, 
    addToCart, 
    addToPreOrder, 
    tr 
  } = useApp();

  const [selectedDoneness, setSelectedDoneness] = useState<MeatDoneness>('medium');
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>('medium');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (customizingItem) {
      const min = customizingItem.minQuantity || 1;
      setQuantity(min);
      setSelectedDoneness('medium');
      setSelectedSpice('medium');
      setSpecialNotes('');
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  const minQty = customizingItem.minQuantity || 1;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(minQty, q - 1));

  const handleConfirm = () => {
    const customizations: SelectedCustomizations = {};
    if (customizingItem.supportsMeatDoneness) {
      customizations.meatDoneness = selectedDoneness;
    }
    if (customizingItem.supportsSpiceLevel) {
      customizations.spiceLevel = selectedSpice;
    }
    if (specialNotes.trim()) {
      customizations.specialInstructions = specialNotes.trim();
    }

    if (customizationTarget === 'preorder') {
      addToPreOrder(customizingItem, quantity, customizations);
    } else {
      addToCart(customizingItem, quantity, customizations);
    }

    closeCustomizationModal();
  };

  const meatOptions: { id: MeatDoneness; label: string; desc: string }[] = [
    { id: 'rare', label: tr.customization.meatOptions.rare, desc: '35°C - Interior rojo jugoso' },
    { id: 'medium_rare', label: tr.customization.meatOptions.medium_rare, desc: '50°C - Sellado exterior, centro rojo' },
    { id: 'medium', label: tr.customization.meatOptions.medium, desc: '60°C - Rosado en el centro (Recomendado)' },
    { id: 'medium_well', label: tr.customization.meatOptions.medium_well, desc: '68°C - Ligeramente rosado' },
    { id: 'well_done', label: tr.customization.meatOptions.well_done, desc: '75°C - Completamente cocinado' }
  ];

  const spiceOptions: { id: SpiceLevel; label: string; iconCount: number }[] = [
    { id: 'mild', label: tr.customization.spiceOptions.mild, iconCount: 1 },
    { id: 'medium', label: tr.customization.spiceOptions.medium, iconCount: 2 },
    { id: 'hot', label: tr.customization.spiceOptions.hot, iconCount: 3 }
  ];

  const itemName = language === 'es' ? customizingItem.name : (customizingItem.nameEn || customizingItem.name);
  const itemDescription = language === 'es' ? customizingItem.description : (customizingItem.descriptionEn || customizingItem.description);
  const currentTotal = +(customizingItem.price * quantity).toFixed(2);

  return (
    <div 
      id="customization-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCustomizationModal();
      }}
    >
      <div className="bg-[#1E1B18] text-[#F5F0E8] w-full max-w-lg rounded-2xl border border-[#B08D57]/30 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-44 sm:h-48 w-full shrink-0">
          <img
            src={customizingItem.image}
            alt={itemName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18] via-[#1E1B18]/40 to-transparent" />
          <button
            onClick={closeCustomizationModal}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
              {itemName}
            </h3>
            <span className="text-[#B08D57] font-semibold text-lg">
              €{customizingItem.price.toFixed(2)}
              {customizingItem.priceDetails ? ` · ${customizingItem.priceDetails}` : ''}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm text-stone-300">
          <p className="text-stone-400 text-xs leading-relaxed">
            {itemDescription}
          </p>

          {/* Min Quantity Alert if applicable */}
          {minQty > 1 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#B08D57]/15 border border-[#B08D57]/30 text-[#B08D57] text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{tr.customization.minQuantityNotice.replace('{min}', String(minQty))}</span>
            </div>
          )}

          {/* Meat Doneness Options */}
          {customizingItem.supportsMeatDoneness && (
            <div className="space-y-2.5">
              <label className="block font-serif font-bold text-white text-base">
                {tr.customization.meatDoneness}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {meatOptions.map((opt) => {
                  const isSelected = selectedDoneness === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedDoneness(opt.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#B52A2A]/20 border-[#B52A2A] text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{opt.label}</div>
                        <div className="text-[11px] text-stone-400">{opt.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#B52A2A] bg-[#B52A2A]' : 'border-stone-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Level Options */}
          {customizingItem.supportsSpiceLevel && (
            <div className="space-y-2.5">
              <label className="block font-serif font-bold text-white text-base">
                {tr.customization.spiceLevel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {spiceOptions.map((opt) => {
                  const isSelected = selectedSpice === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSpice(opt.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#B52A2A]/20 border-[#B52A2A] text-white'
                          : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-0.5 mb-1 text-[#C55A2A]">
                        {Array.from({ length: opt.iconCount }).map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 fill-[#C55A2A]" />
                        ))}
                      </div>
                      <span className="text-xs font-medium">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special notes */}
          <div className="space-y-2">
            <label className="block font-serif font-semibold text-white">
              {tr.customization.specialNotes}
            </label>
            <textarea
              rows={2}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={tr.customization.specialNotesPlaceholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#B08D57]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#151311] border-t border-[#B08D57]/20 flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/10">
            <button
              onClick={handleDecrement}
              disabled={quantity <= minQty}
              className="p-2 text-stone-300 hover:text-white disabled:opacity-30"
              aria-label="Restar"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 font-semibold text-white text-base min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2 text-stone-300 hover:text-white"
              aria-label="Sumar"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#B52A2A] to-[#C55A2A] hover:from-[#9c2424] hover:to-[#b04f24] text-white font-medium text-sm flex items-center justify-between shadow-lg transition-all"
          >
            <span>
              {customizationTarget === 'preorder' 
                ? tr.customization.addToResBtn 
                : tr.customization.addBtn}
            </span>
            <span className="font-bold">€{currentTotal.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

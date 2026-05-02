import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProjectLayout from '../components/ProjectLayout';
import FloatingKs from '../components/FloatingKs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gift, Wrench, CheckCircle, Laptop, Heart, Users, ArrowRight, Globe, X } from "lucide-react";
import { t } from '../lib/translations';
import type { Lang } from '../lib/translations';
import { useNavigate } from 'react-router-dom';
import { addDonation, addRequest } from "@/lib/submissionStore";

// ── Font injection (Space Grotesk + Inter) ──────────────────────────────
function useFonts() {
  useEffect(() => {
    const id = 'jtc-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);
}

// ── Field error ─────────────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span className="text-red-300 text-xs mt-1 flex items-center gap-1">
      <X className="h-3 w-3" /> {msg}
    </span>
  );
}

// ── Success card ────────────────────────────────────────────────────────
function SuccessCard({ title, msg, onReset, lang }: { title: string; msg: string; onReset: () => void; lang: Lang }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-5">
        <CheckCircle className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{title}</h3>
      <p className="text-white/80 text-sm mb-6 max-w-xs" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{msg}</p>
      <button
        onClick={onReset}
        className="text-white/60 text-sm hover:text-white transition-colors underline underline-offset-4"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {t[lang].success.another}
      </button>
    </div>
  );
}



const stepIcons = [Gift, Wrench, CheckCircle];

// ── Main page ───────────────────────────────────────────────────────────
export default function JTC() {
  const navigate = useNavigate()
  useFonts();

const [lang, setLang] = useState<Lang>('en');
  const tx = t[lang];
  const isRtl = lang === 'ar';

  const statIcons = [Laptop, Users, Heart];  // ← add this
  const stats = tx.impacts.stats.map((stat, i) => ({  // ← add this
    icon: statIcons[i],
    value: stat.value,
    label: stat.label,
  }));

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Donation form
  const [donation, setDonation] = useState({
    name: '', phone: '', email: '', brand: '', model: '', serial: '', notes: '',
  });
  const [donationErrors, setDonationErrors] = useState<Record<string, string>>({});
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationLoading, setDonationLoading] = useState(false);

  // Request form
  const [request, setRequest] = useState({
    name: '', age: '', gender: '', city: '', reason: '',
  });
  const [requestErrors, setRequestErrors] = useState<Record<string, string>>({});
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  const validateDonation = () => {
    const errs: Record<string, string> = {};
    if (!donation.name.trim())   errs.name   = tx.validation.nameRequired;
    if (!donation.phone.trim())  errs.phone  = tx.validation.nameRequired; // reuse "required" msg
    if (!donation.brand.trim())  errs.brand  = tx.validation.nameRequired;
    if (!donation.model.trim())  errs.model  = tx.validation.nameRequired;
    if (!donation.serial.trim()) errs.serial = tx.validation.nameRequired;
    if (donation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donation.email))
      errs.email = tx.validation.emailInvalid;
    return errs;
  };

  const validateRequest = () => {
    const errs: Record<string, string> = {};
    if (!request.name.trim())   errs.name   = tx.validation.nameRequired;
    if (!request.gender)        errs.gender = tx.validation.genderRequired;
    if (!request.city.trim())   errs.city   = tx.validation.cityRequired;
    if (!request.reason.trim()) errs.reason = tx.validation.reasonRequired;
    return errs;
  };

  const handleDonationSubmit = async () => {
    const errs = validateDonation();
    setDonationErrors(errs);
    if (Object.keys(errs).length) return;
    setDonationLoading(true);
    await new Promise(r => setTimeout(r, 1200));
      addDonation({
      donorName: donation.name,
      phone: donation.phone,
      email: donation.email,
      brand: donation.brand,
      model: donation.model,
      serial: donation.serial,
      notes: donation.notes,
  });

    setDonationLoading(false);
    setDonationSuccess(true);
  };

  const handleRequestSubmit = async () => {
    const errs = validateRequest();
    setRequestErrors(errs);
    if (Object.keys(errs).length) return;
    setRequestLoading(true);
    await new Promise(r => setTimeout(r, 1200));
      addRequest({
      name: request.name,
      age: Number(request.age),
      gender: request.gender,
      city: request.city,
      reason: request.reason,
  });
    setRequestLoading(false);
    setRequestSuccess(true);
  };

  const navSections = [
    { label: tx.nav.about,      id: 'about' },
    { label: tx.nav.howItWorks, id: 'how-it-works' },
    { label: tx.nav.impacts,    id: 'impacts' },
    { label: tx.nav.donate,     id: 'donate' },
    { label: tx.nav.request,    id: 'request' },
  ];

  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
  const inter:   React.CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };

  return (
    <ProjectLayout theme="jtc">
      {/* relative wrapper so FloatingKs (absolute) covers full page height */}
      <div className="relative flex flex-col min-h-screen" style={inter}>

        <FloatingKs />

        <div className="relative z-10 flex flex-col flex-1" dir={tx.dir}>
          <nav className="flex flex-wrap gap-2 sm:gap-6 px-4 sm:px-12 py-3 items-center justify-between top-0 z-40 backdrop-blur-sm bg-[#0cafa3]/80">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {navSections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="text-white/80 px-2 py-1 text-sm hover:text-white transition-colors cursor-pointer border-none bg-transparent font-medium underline-offset-4"
                  style={inter}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </nav>

          {/* ── HERO / ABOUT ── */}
          <section id="about" className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20">
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
                  className={`${lang === 'en' ? 'ml-auto' : 'mr-auto'} flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors px-2 py-1 rounded-lg hover:bg-white/10 border border-white/20`}
                  style={inter}
                >
                  <Globe className="h-3.5 w-3.5" />
                  {lang === 'en' ? 'عربي' : 'English'}
                </button>
              </div>

              <h1
                className="text-5xl sm:text-5xl lg:text-6xl font-bold text-[#1F3A5F] max-w-6xl leading-tight mb-6"
                style={grotesk}
              >
                {tx.hero.title1}{' '}
                <span className="text-white">
                  {tx.hero.titleHighlight}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/30 rounded-full" />
                </span>{' '}
                {tx.hero.title2}
              </h1>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '250ms' }}>
              <p className="text-white/90 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed" style={inter}>
                {tx.hero.subtitle}
              </p>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                size="lg"
                className="bg-white text-[#0cafa3] hover:bg-white/90 font-semibold rounded-xl px-8 py-6 transition-all shadow-lg"
                style={grotesk}
                onClick={() => scrollTo('donate')}
              >
                {tx.hero.donateCta}
                <ArrowRight className={`h-4 w-4 ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
              <Button
                size="lg"
                className="bg-transparent text-[#1F3A5F] font-semibold px-8 py-6 border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all"
                style={grotesk}
                onClick={() => scrollTo('request')}
              >
                {tx.hero.requestCta}
              </Button>
            </div>

            <div>
              <button
                onClick={() => navigate('/jtc/admin')}
                className="text-white/40 text-sm hover:text-white/70 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none"
                style={inter}
              >
                {tx.hero.adminLink}
              </button>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3A5F] mb-3" style={grotesk}>{tx.howItWorks.title}</h2>
            <p className="text-white/80 mb-12" style={inter}>{tx.howItWorks.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {tx.howItWorks.steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <Card key={i} className="bg-white/15 border-white/20 text-center">
                    <CardContent className="pt-6 pb-6">
                      <div className="mx-auto w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2" style={grotesk}>{step.title}</h3>
                      <p className="text-white/70 text-sm" style={inter}>{step.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── IMPACT ── */}
          <section id="impacts" className="py-14 bg-black/10 mt-6" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <stat.icon className="h-8 w-8 text-white/70 mx-auto" />
                  <div className="text-2xl font-bold text-[#1F3A5F]" style={grotesk}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70" style={inter}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FORMS ── */}
          <section className="py-16 sm:py-20 px-4 sm:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-6xl mx-auto">

              {/* ── DONATE FORM ── */}
              <div id="donate">
                <Card className="bg-white/15 border-white/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3 text-xl sm:text-2xl" style={grotesk}>
                      <Gift className="h-6 w-6 flex-shrink-0" /> {tx.donateForm.title}
                    </CardTitle>
                    <CardDescription className="text-white/70" style={inter}>{tx.donateForm.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {donationSuccess ? (
                      <SuccessCard
                        title={tx.success.donateTitle}
                        msg={tx.success.donateMsg}
                        onReset={() => {
                          setDonationSuccess(false);
                          setDonation({ name: '', phone: '', email: '', brand: '', model: '', serial: '', notes: '' });
                        }}
                        lang={lang}
                      />
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                          {/* Name */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.donateForm.name} <span className="text-red-300">*</span>
                            </Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${donationErrors.name ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.donateForm.namePlaceholder}
                              value={donation.name}
                              onChange={e => { setDonation(d => ({ ...d, name: e.target.value })); setDonationErrors(er => ({ ...er, name: '' })); }}
                            />
                            <FieldError msg={donationErrors.name} />
                          </div>

                          {/* Phone */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.donateForm.phone} <span className="text-red-300">*</span>
                            </Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${donationErrors.phone ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.donateForm.phonePlaceholder}
                              value={donation.phone}
                              onChange={e => { setDonation(d => ({ ...d, phone: e.target.value })); setDonationErrors(er => ({ ...er, phone: '' })); }}
                            />
                            <FieldError msg={donationErrors.phone} />
                          </div>

                          {/* Email */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>{tx.donateForm.email}</Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${donationErrors.email ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.donateForm.emailPlaceholder}
                              value={donation.email}
                              onChange={e => { setDonation(d => ({ ...d, email: e.target.value })); setDonationErrors(er => ({ ...er, email: '' })); }}
                            />
                            <FieldError msg={donationErrors.email} />
                          </div>

                          {/* Brand — now required */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.donateForm.brand} <span className="text-red-300">*</span>
                            </Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${donationErrors.brand ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.donateForm.brandPlaceholder}
                              value={donation.brand}
                              onChange={e => { setDonation(d => ({ ...d, brand: e.target.value })); setDonationErrors(er => ({ ...er, brand: '' })); }}
                            />
                            <FieldError msg={donationErrors.brand} />
                          </div>

                          {/* Model — now required */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.donateForm.model} <span className="text-red-300">*</span>
                            </Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${donationErrors.model ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.donateForm.modelPlaceholder}
                              value={donation.model}
                              onChange={e => { setDonation(d => ({ ...d, model: e.target.value })); setDonationErrors(er => ({ ...er, model: '' })); }}
                            />
                            <FieldError msg={donationErrors.model} />
                          </div>

                          {/* Serial — now required */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.donateForm.serial} <span className="text-red-300">*</span>
                            </Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${donationErrors.serial ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.donateForm.serialPlaceholder}
                              value={donation.serial}
                              onChange={e => { setDonation(d => ({ ...d, serial: e.target.value })); setDonationErrors(er => ({ ...er, serial: '' })); }}
                            />
                            <FieldError msg={donationErrors.serial} />
                          </div>

                        </div>

                        {/* Notes */}
                        <div className="space-y-1">
                          <Label className="text-white text-sm" style={inter}>{tx.donateForm.notes}</Label>
                          <Textarea
                            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 resize-vertical"
                            style={inter}
                            placeholder={tx.donateForm.notesPlaceholder}
                            rows={3}
                            value={donation.notes}
                            onChange={e => setDonation(d => ({ ...d, notes: e.target.value }))}
                          />
                        </div>

                        <Button
                          className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 py-5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                          style={grotesk}
                          onClick={handleDonationSubmit}
                          disabled={donationLoading}
                        >
                          {donationLoading ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              {lang === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...'}
                            </span>
                          ) : tx.donateForm.submit}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* ── REQUEST FORM ── */}
              <div id="request">
                <Card className="bg-white/15 border-white/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2 text-xl sm:text-2xl" style={grotesk}>
                      <Laptop className="h-6 w-6 flex-shrink-0" /> {tx.requestForm.title}
                    </CardTitle>
                    <CardDescription className="text-white/70" style={inter}>{tx.requestForm.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {requestSuccess ? (
                      <SuccessCard
                        title={tx.success.requestTitle}
                        msg={tx.success.requestMsg}
                        onReset={() => {
                          setRequestSuccess(false);
                          setRequest({ name: '', age: '', gender: '', city: '', reason: '' });
                        }}
                        lang={lang}
                      />
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                          {/* Name */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.requestForm.name} <span className="text-red-300">*</span>
                            </Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${requestErrors.name ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.requestForm.namePlaceholder}
                              value={request.name}
                              onChange={e => { setRequest(r => ({ ...r, name: e.target.value })); setRequestErrors(er => ({ ...er, name: '' })); }}
                            />
                            <FieldError msg={requestErrors.name} />
                          </div>

                          {/* Age */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>{tx.requestForm.age}</Label>
                            <Input
                              className="bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25"
                              style={inter}
                              placeholder={tx.requestForm.agePlaceholder}
                              value={request.age}
                              type="number"
                              min={1} max={100}
                              onChange={e => setRequest(r => ({ ...r, age: e.target.value }))}
                            />
                          </div>

                          {/* Gender */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.requestForm.gender} <span className="text-red-300">*</span>
                            </Label>
                            <Select
                              value={request.gender}
                              onValueChange={v => { setRequest(r => ({ ...r, gender: v })); setRequestErrors(er => ({ ...er, gender: '' })); }}
                            >
                              <SelectTrigger
                                className={`bg-white/20 border-white/20 text-white w-full transition-all ${requestErrors.gender ? 'border-red-400' : ''}`}
                                style={inter}
                              >
                                <SelectValue placeholder={tx.requestForm.genderPlaceholder} />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden">
                                {[
                                  { value: 'male',   label: tx.requestForm.genderMale },
                                  { value: 'female', label: tx.requestForm.genderFemale },
                                ].map(opt => (
                                  <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    className="text-gray-700 hover:bg-teal-50 focus:bg-teal-50 cursor-pointer py-3 px-4 transition-colors rounded-lg mx-1"
                                    style={inter}
                                  >
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError msg={requestErrors.gender} />
                          </div>

                          {/* City */}
                          <div className="space-y-1">
                            <Label className="text-white text-sm" style={inter}>
                              {tx.requestForm.city} <span className="text-red-300">*</span>
                            </Label>
                            <Input
                              className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 ${requestErrors.city ? 'border-red-400' : ''}`}
                              style={inter}
                              placeholder={tx.requestForm.cityPlaceholder}
                              value={request.city}
                              onChange={e => { setRequest(r => ({ ...r, city: e.target.value })); setRequestErrors(er => ({ ...er, city: '' })); }}
                            />
                            <FieldError msg={requestErrors.city} />
                          </div>

                        </div>

                        {/* Reason */}
                        <div className="space-y-1">
                          <Label className="text-white text-sm" style={inter}>
                            {tx.requestForm.reason} <span className="text-red-300">*</span>
                          </Label>
                          <Textarea
                            className={`bg-white/20 border-white/20 text-white placeholder:text-white/50 transition-all focus:bg-white/25 resize-vertical ${requestErrors.reason ? 'border-red-400' : ''}`}
                            style={inter}
                            placeholder={tx.requestForm.reasonPlaceholder}
                            rows={4}
                            value={request.reason}
                            onChange={e => { setRequest(r => ({ ...r, reason: e.target.value })); setRequestErrors(er => ({ ...er, reason: '' })); }}
                          />
                          <FieldError msg={requestErrors.reason} />
                        </div>

                        <Button
                          className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 py-5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                          style={grotesk}
                          onClick={handleRequestSubmit}
                          disabled={requestLoading}
                        >
                          {requestLoading ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              {lang === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...'}
                            </span>
                          ) : tx.requestForm.submit}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          {/* ── FOOTER ── */}
          <footer className="bg-black/10 py-8 mt-10">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-white/70 text-sm" style={inter}>
                <span className="font-bold text-white" style={grotesk}>{tx.footer.brand}</span> — {tx.footer.project}
              </p>
              <p className="text-white/60 text-sm mt-1" style={inter}>
                {tx.footer.tagline} © {new Date().getFullYear()}
              </p>
            </div>
          </footer>

        </div>
      </div>
    </ProjectLayout>
  );
}

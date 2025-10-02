'use client';

import { useState, useEffect } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoModal,
  NeoInput,
  NeoBadge,
  NeoProgress
} from '@/components/neo-materialism';

interface ContentCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'independent' | 'sponsored';
  onContentCreated: (content: any) => void;
}

interface ContentForm {
  title: string;
  description: string;
  contentType: string;
  tags: string[];
  isSponsored: boolean;
  brandId?: string;
  requirements?: any;
  platforms: string[];
  scheduledPublish?: Date;
  metadata: {
    duration?: number;
    difficulty?: string;
    targetAudience?: string;
    callToAction?: string;
  };
}

const CONTENT_TYPES = [
  { id: 'ARTICLE', label: 'Article', icon: '', description: 'Long-form written content' },
  { id: 'VIDEO', label: 'Video', icon: '', description: 'Video content for platforms' },
  { id: 'PODCAST', label: 'Podcast', icon: '', description: 'Audio content and episodes' },
  { id: 'SOCIAL_POST', label: 'Social Post', icon: '', description: 'Short-form social content' },
  { id: 'INFOGRAPHIC', label: 'Infographic', icon: '', description: 'Visual data representation' },
  { id: 'THREAD', label: 'Thread', icon: '', description: 'Twitter/X thread series' },
  { id: 'CAROUSEL', label: 'Carousel', icon: '', description: 'Multi-slide content' }
];

const PLATFORMS = [
  { id: 'youtube', label: 'YouTube', icon: '' },
  { id: 'instagram', label: 'Instagram', icon: '' },
  { id: 'tiktok', label: 'TikTok', icon: '' },
  { id: 'twitter', label: 'X (Twitter)', icon: '' },
  { id: 'linkedin', label: 'LinkedIn', icon: '' },
  { id: 'facebook', label: 'Facebook', icon: '' },
  { id: 'medium', label: 'Medium', icon: '' },
  { id: 'substack', label: 'Substack', icon: '' }
];

const MOCK_BRIEFS = [
  {
    id: '1',
    title: 'Tech Product Launch Campaign',
    brand: 'TechCorp',
    budget: 5000,
    deadline: '2024-02-15',
    requirements: {
      platforms: ['youtube', 'instagram', 'tiktok'],
      contentTypes: ['VIDEO', 'SOCIAL_POST'],
      targetAudience: 'Tech enthusiasts 18-35',
      keyMessages: ['Innovation', 'User-friendly', 'Premium quality']
    }
  },
  {
    id: '2',
    title: 'Sustainable Fashion Awareness',
    brand: 'EcoStyle',
    budget: 3000,
    deadline: '2024-02-20',
    requirements: {
      platforms: ['instagram', 'tiktok'],
      contentTypes: ['CAROUSEL', 'SOCIAL_POST'],
      targetAudience: 'Eco-conscious millennials',
      keyMessages: ['Sustainability', 'Fashion-forward', 'Ethical choices']
    }
  }
];

export default function ContentCreationWizard({ 
  isOpen, 
  onClose, 
  contentType,
  onContentCreated 
}: ContentCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ContentForm>({
    title: '',
    description: '',
    contentType: '',
    tags: [],
    isSponsored: contentType === 'sponsored',
    platforms: [],
    metadata: {}
  });
  const [selectedBrief, setSelectedBrief] = useState<any>(null);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  const totalSteps = contentType === 'sponsored' ? 5 : 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = {
      ...formData,
      id: Date.now().toString(),
      status: 'DRAFT',
      createdAt: new Date().toISOString()
    };
    
    onContentCreated(content);
    setLoading(false);
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const selectBrief = (brief: any) => {
    setSelectedBrief(brief);
    setFormData(prev => ({
      ...prev,
      brandId: brief.id,
      platforms: brief.requirements.platforms,
      contentType: brief.requirements.contentTypes[0],
      requirements: brief.requirements
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="neo-heading-4 text-white mb-2">Basic Information</h3>
              <p className="neo-text-small text-slate-400">
                Let's start with the basics of your content
              </p>
            </div>

            <NeoInput
              label="Content Title"
              placeholder="Enter a compelling title for your content"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              variant="glass"
            />

            <div>
              <label className="neo-label text-white mb-2 block">Description</label>
              <textarea
                className="neo-input neo-glass w-full p-4 rounded-xl border border-slate-600/50 bg-slate-800/50 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Describe your content, what it's about, and what value it provides..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <label className="neo-label text-white mb-2 block">Content Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CONTENT_TYPES.map((type) => (
                  <NeoCard
                    key={type.id}
                    variant={formData.contentType === type.id ? 'elevated' : 'glass'}
                    className={`p-4 cursor-pointer transition-all ${
                      formData.contentType === type.id ? 'neo-glow' : 'hover:neo-elevation-1'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, contentType: type.id }))}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <h4 className="neo-text-small text-white font-medium">{type.label}</h4>
                      <p className="neo-text-small text-slate-400 text-xs">{type.description}</p>
                    </div>
                  </NeoCard>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="neo-heading-4 text-white mb-2">Distribution Platforms</h3>
              <p className="neo-text-small text-slate-400">
                Select where you want to publish your content
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PLATFORMS.map((platform) => (
                <NeoCard
                  key={platform.id}
                  variant={formData.platforms.includes(platform.id) ? 'elevated' : 'glass'}
                  className={`p-4 cursor-pointer transition-all ${
                    formData.platforms.includes(platform.id) ? 'neo-glow' : 'hover:neo-elevation-1'
                  }`}
                  onClick={() => {
                    const newPlatforms = formData.platforms.includes(platform.id)
                      ? formData.platforms.filter(p => p !== platform.id)
                      : [...formData.platforms, platform.id];
                    setFormData(prev => ({ ...prev, platforms: newPlatforms }));
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <h4 className="neo-text-small text-white font-medium">{platform.label}</h4>
                  </div>
                </NeoCard>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="neo-heading-4 text-white mb-2">Tags & Metadata</h3>
              <p className="neo-text-small text-slate-400">
                Add tags to help categorize and discover your content
              </p>
            </div>

            {/* Tags Input */}
            <div>
              <label className="neo-label text-white mb-2 block">Tags</label>
              <div className="flex space-x-2 mb-3">
                <NeoInput
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  variant="glass"
                  className="flex-1"
                />
                <NeoButton variant="secondary" onClick={addTag}>
                  Add
                </NeoButton>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <NeoBadge 
                      key={tag} 
                      variant="info" 
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </NeoBadge>
                  ))}
                </div>
              )}
            </div>

            {/* Content Metadata */}
            <div className="grid md:grid-cols-2 gap-4">
              <NeoInput
                label="Target Audience"
                placeholder="e.g., Tech enthusiasts, Fitness beginners"
                value={formData.metadata.targetAudience || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, targetAudience: e.target.value }
                }))}
                variant="glass"
              />

              <NeoInput
                label="Call to Action"
                placeholder="e.g., Subscribe, Learn more, Buy now"
                value={formData.metadata.callToAction || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, callToAction: e.target.value }
                }))}
                variant="glass"
              />
            </div>

            {formData.contentType === 'VIDEO' && (
              <NeoInput
                label="Duration (minutes)"
                type="number"
                placeholder="e.g., 10"
                value={formData.metadata.duration || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, duration: parseInt(e.target.value) }
                }))}
                variant="glass"
              />
            )}
          </div>
        );

      case 4:
        if (contentType === 'sponsored' && !selectedBrief) {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="neo-heading-4 text-white mb-2">Select a Brand Brief</h3>
                <p className="neo-text-small text-slate-400">
                  Choose from available sponsored content opportunities
                </p>
              </div>

              <div className="space-y-4">
                {MOCK_BRIEFS.map((brief) => (
                  <NeoCard
                    key={brief.id}
                    variant="interactive"
                    className="p-6 cursor-pointer hover:neo-elevation-2"
                    onClick={() => selectBrief(brief)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="neo-heading-4 text-white mb-1">{brief.title}</h4>
                        <p className="neo-text-small text-slate-300">by {brief.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="neo-text-small text-green-400 font-medium">${brief.budget.toLocaleString()}</p>
                        <p className="neo-text-small text-slate-400">Budget</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <NeoBadge variant="warning" size="sm">
                          Deadline: {new Date(brief.deadline).toLocaleDateString()}
                        </NeoBadge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {brief.requirements.platforms.map((platform: string) => (
                          <NeoBadge key={platform} variant="info" size="sm">
                            {platform}
                          </NeoBadge>
                        ))}
                      </div>
                    </div>

                    <p className="neo-text-small text-slate-400">
                      Target: {brief.requirements.targetAudience}
                    </p>
                  </NeoCard>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="neo-heading-4 text-white mb-2">Review & Schedule</h3>
              <p className="neo-text-small text-slate-400">
                Review your content details and set publishing preferences
              </p>
            </div>

            {/* Content Summary */}
            <NeoCard variant="glass" className="p-6">
              <h4 className="neo-heading-4 text-white mb-4">Content Summary</h4>
              <div className="space-y-3">
                <div>
                  <span className="neo-text-small text-slate-400">Title:</span>
                  <p className="neo-text-small text-white">{formData.title}</p>
                </div>
                <div>
                  <span className="neo-text-small text-slate-400">Type:</span>
                  <p className="neo-text-small text-white">
                    {CONTENT_TYPES.find(t => t.id === formData.contentType)?.label}
                  </p>
                </div>
                <div>
                  <span className="neo-text-small text-slate-400">Platforms:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.platforms.map((platform) => (
                      <NeoBadge key={platform} variant="info" size="sm">
                        {PLATFORMS.find(p => p.id === platform)?.label}
                      </NeoBadge>
                    ))}
                  </div>
                </div>
                {formData.tags.length > 0 && (
                  <div>
                    <span className="neo-text-small text-slate-400">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.tags.map((tag) => (
                        <NeoBadge key={tag} variant="secondary" size="sm">
                          {tag}
                        </NeoBadge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedBrief && (
                  <div>
                    <span className="neo-text-small text-slate-400">Sponsored by:</span>
                    <p className="neo-text-small text-white">{selectedBrief.brand}</p>
                  </div>
                )}
              </div>
            </NeoCard>

            {/* Publishing Options */}
            <div>
              <label className="neo-label text-white mb-2 block">Publishing Schedule</label>
              <div className="grid md:grid-cols-2 gap-4">
                <NeoButton
                  variant={!formData.scheduledPublish ? 'primary' : 'ghost'}
                  onClick={() => setFormData(prev => ({ ...prev, scheduledPublish: undefined }))}
                  className="w-full"
                >
                  Publish Immediately
                </NeoButton>
                <NeoButton
                  variant={formData.scheduledPublish ? 'primary' : 'ghost'}
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setFormData(prev => ({ ...prev, scheduledPublish: tomorrow }));
                  }}
                  className="w-full"
                >
                  Schedule for Later
                </NeoButton>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <NeoModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create ${contentType === 'independent' ? 'Independent' : 'Sponsored'} Content`}
      variant="glass"
      size="xl"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Step {currentStep} of {totalSteps}</span>
            <span className="text-slate-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <NeoProgress 
            value={(currentStep / totalSteps) * 100} 
            color="blue" 
            variant="energy" 
          />
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-slate-700/50">
          <NeoButton 
            variant="ghost" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </NeoButton>
          
          <div className="flex space-x-3">
            <NeoButton variant="ghost" onClick={onClose}>
              Cancel
            </NeoButton>
            {currentStep === totalSteps ? (
              <NeoButton 
                variant="primary" 
                onClick={handleSubmit}
                loading={loading}
                disabled={!formData.title || !formData.contentType || formData.platforms.length === 0}
              >
                Create Content
              </NeoButton>
            ) : (
              <NeoButton 
                variant="primary" 
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!formData.title || !formData.contentType)) ||
                  (currentStep === 2 && formData.platforms.length === 0) ||
                  (currentStep === 4 && contentType === 'sponsored' && !selectedBrief)
                }
              >
                Next
              </NeoButton>
            )}
          </div>
        </div>
      </div>
    </NeoModal>
  );
}

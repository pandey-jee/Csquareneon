import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { MemberRegistration } from '@/types';

const membershipSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  academicYear: z.enum(['1st', '2nd', '3rd', '4th'], {
    required_error: 'Please select your academic year',
  }),
  programmingExperience: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select your programming experience level',
  }),
});

interface JoinClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinClubModal({ isOpen, onClose }: JoinClubModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<MemberRegistration>({
    resolver: zodResolver(membershipSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: MemberRegistration) => {
      return apiRequest('/members');
    },
    onSuccess: () => {
      toast({
        title: 'Welcome to CSquare!',
        description: 'Your membership application has been submitted.',
      });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: MemberRegistration) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    if (!mutation.isPending) {
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div data-testid="modal-join-club">
      <div>
        <h2>
          Join CSquare
        </h2>
        <p data-testid="text-modal-subtitle">
          Become a member of our competitive programming community
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            placeholder="Enter your full name"
            {...register('name')}
            data-testid="input-name"
          />
          {errors.name && (
            <p data-testid="error-name">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@college.edu"
            {...register('email')}
            data-testid="input-email"
          />
          {errors.email && (
            <p data-testid="error-email">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="rollNumber">
            Roll Number
          </label>
          <input
            id="rollNumber"
            placeholder="e.g., 2021CSE001"
            {...register('rollNumber')}
            data-testid="input-roll-number"
          />
          {errors.rollNumber && (
            <p data-testid="error-roll-number">{errors.rollNumber.message}</p>
          )}
        </div>
        
        <div>
          <label>
            Academic Year
          </label>
          <select 
            onChange={(e) => setValue('academicYear', e.target.value as any)}
            data-testid="select-academic-year"
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
          {errors.academicYear && (
            <p data-testid="error-academic-year">{errors.academicYear.message}</p>
          )}
        </div>
        
        <div>
          <label>
            Programming Experience
          </label>
          <select 
            onChange={(e) => setValue('programmingExperience', e.target.value as any)}
            data-testid="select-programming-experience"
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.programmingExperience && (
            <p data-testid="error-programming-experience">{errors.programmingExperience.message}</p>
          )}
        </div>
        
        <div>
          <button
            type="button"
            onClick={handleClose}
            disabled={mutation.isPending}
            data-testid="button-cancel-join"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            data-testid="button-submit-join"
          >
            {mutation.isPending ? 'Joining...' : 'Join CSquare'}
          </button>
        </div>
      </form>
    </div>
  );
}

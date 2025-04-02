
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, User } from 'lucide-react';

// Define form schema with validation
const formSchema = z.object({
  doctorName: z.string().min(2, {
    message: "Doctor name must be at least 2 characters.",
  }),
  specialty: z.string().min(2, {
    message: "Specialty must be at least 2 characters.",
  }),
});

// Get doctor info from localStorage
const getDoctorInfo = () => {
  const savedDoctor = localStorage.getItem('doctor');
  if (savedDoctor) {
    return JSON.parse(savedDoctor);
  }
  return {
    name: 'Dr. Arjun',
    specialty: 'Cardiologist'
  };
};

const Settings = () => {
  const { toast } = useToast();
  const [doctor, setDoctor] = useState(getDoctorInfo());

  // Initialize form with current values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorName: doctor.name,
      specialty: doctor.specialty,
    },
  });

  // Update form if doctor info changes
  useEffect(() => {
    form.reset({
      doctorName: doctor.name,
      specialty: doctor.specialty,
    });
  }, [doctor, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Update doctor info
    const updatedDoctor = {
      name: values.doctorName,
      specialty: values.specialty
    };
    
    // Save to localStorage
    localStorage.setItem('doctor', JSON.stringify(updatedDoctor));
    
    // Update local state
    setDoctor(updatedDoctor);
    
    // Show success toast
    toast({
      title: "Settings updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <header className="flex items-center mb-8">
          <SettingsIcon className="h-6 w-6 mr-2 text-blue-600" />
          <h2 className="text-2xl font-bold">Settings</h2>
        </header>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Doctor Profile
              </CardTitle>
              <CardDescription>
                Update your profile information that will be displayed throughout the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="doctorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter doctor name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be displayed in the sidebar and throughout the application.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialty</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter specialty" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your medical specialty (e.g., Cardiologist, Neurologist)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;

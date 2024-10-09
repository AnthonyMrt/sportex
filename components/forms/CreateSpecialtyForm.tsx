"use client";
import React from "react";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpecialitySchema } from "../../schemas/index";
import { Input } from "../ui/input";
import Loading from "../global/loading";
import UploadObjectBucket from "../global/s3-upload-file";
import { createSpeciality } from "@/data";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateSpecialtyForm = () => {
  const form = useForm<z.infer<typeof SpecialitySchema>>({
    resolver: zodResolver(SpecialitySchema),
    defaultValues: {
      logo: "",
      name: "",
      goal: "",
    },
  });

  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof SpecialitySchema>) => {
    try {
      await createSpeciality(data);
      router.refresh();
      toast.success("Speciality created");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Speciality details</CardTitle>
        <CardDescription>
          let&apos;s create a new speciality. You can edit later from settings
          tab.
        </CardDescription>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={isLoading}
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Image</FormLabel>
                    <FormControl>
                      <UploadObjectBucket
                        accept={{ "image/*": [] }}
                        maxSize={1024 * 1024 * 4}
                        acceptName="Image"
                        showErrorMessage="Invalid file type. Please upload an image file with the correct size"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the name of the speciality"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="20" type="number" />
                    </FormControl>
                    <FormDescription>
                      How many customer would you like to have in this
                      speciality?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loading /> : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CreateSpecialtyForm;

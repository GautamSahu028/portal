"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  onClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "text-center p-12 border-2 border-dashed rounded-2xl bg-muted hover:bg-muted/70 transition-all duration-300 border-border cursor-pointer group"
      )}
    >
      {/* Icon */}
      <div className="mx-auto w-24 h-24 mb-8 text-primary group-hover:text-primary/80 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary">
        Begin Attendance Tracking
      </h3>

      {/* Description */}
      <p className="text-muted-foreground mb-8 text-lg">
        Click to upload an image to identify and record attendees
      </p>

      {/* Upload Instruction */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg mb-8 border border-primary/20">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span className="text-sm font-medium">
          Drag & drop or click to upload
        </span>
      </div>

      {/* Model Info Box */}
      <div className="bg-background border border-border p-6 rounded-xl shadow-sm text-left">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-foreground">
            Recognition Model Information
          </h4>
        </div>

        {/* Game of Thrones */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-100 dark:bg-amber-500/20 rounded-md flex items-center justify-center">
              <svg
                className="w-3 h-3 text-amber-600 dark:text-amber-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="font-semibold text-amber-600 dark:text-amber-300 text-sm uppercase tracking-wider">
              Game of Thrones Characters
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Tyrion Lannister",
              "Jon Snow",
              "Daenerys Targaryen",
              "Arya Stark",
              "Sansa Stark",
              "Bran Stark",
              "Cersei Lannister",
              "Jaime Lannister",
              "Jorah Mormont",
              "Samwell Tarly",
              "Theon Greyjoy",
              "Petyr Baelish",
              "Varys",
              "Bronn",
              "Sandor Clegane",
              "Davos Seaworth",
              "Brienne of Tarth",
              "Gilly",
              "Missandei",
              "Grey Worm",
              "Ygritte",
              "Margaery Tyrell",
              "Stannis Baratheon",
              "Melisandre",
              "Gendry",
            ].map((name) => (
              <span
                key={name}
                className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-200 rounded-full text-xs font-medium border border-amber-300 dark:border-amber-500/20"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Marvel */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-100 dark:bg-red-500/20 rounded-md flex items-center justify-center">
              <svg
                className="w-3 h-3 text-red-600 dark:text-red-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-semibold text-red-600 dark:text-red-300 text-sm uppercase tracking-wider">
              Marvel Characters
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Antman",
              "Black Panther",
              "Black Widow",
              "Captain America",
              "Captain Marvel",
              "Doctor Strange",
              "Hulk",
              "Iron Man",
              "Loki",
              "Nick Fury",
              "Spider-Man",
              "Thor",
              "Wasp",
            ].map((name) => (
              <span
                key={name}
                className="px-3 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-200 rounded-full text-xs font-medium border border-red-300 dark:border-red-500/20"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 p-4 bg-yellow-100 dark:bg-yellow-500/10 rounded-lg border border-yellow-300 dark:border-yellow-500/30">
          <svg
            className="w-5 h-5 text-yellow-700 dark:text-yellow-400 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">
              Performance Notice
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Processing time may vary as the model runs on a free HuggingFace
              instance. Please allow extra time for recognition processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

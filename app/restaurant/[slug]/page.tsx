import { PrismaClient, Review } from '@prisma/client';
import React from 'react';
import Description from './components/Description';
import Images from './components/Images';
import Rating from './components/Rating';
import ReservationCard from './components/ReservationCard';
import RestaurantNavBar from './components/RestaurantNavBar';
import Reviews from './components/Reviews';
import Title from './components/Title';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  description: string;
  images: string[];
  slug: string;
  reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
      reviews: true,
    },
  });

  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

export const metadata = {
  title: 'Restaurant Milestones Grill',
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  console.log({ restaurant });
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <ReservationCard />
    </>
  );
}

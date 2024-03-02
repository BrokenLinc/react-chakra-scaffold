import { Wumpus, wumpusSchema } from '@@api/wumpusesApi';
import { WumpusFormGrid } from '@@components/WumpusFormGrid';
import { useHookForm } from '@@forms/hooks/useHookForm';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useParams } from 'react-router-dom';

const EditForm: React.FC<{
  originalData: Wumpus;
}> = ({ originalData }) => {
  const form = useHookForm<Wumpus>({
    resolver: zodResolver(wumpusSchema),
    defaultValues: originalData,
    onValid: (data) => {
      console.log('onValid', data);
      // This function can be async, and can throw errors to users.
    },
  });

  return (
    <UI.QuickForm form={form}>
      <WumpusFormGrid />
    </UI.QuickForm>
  );
};

export const EditWumpusPage: React.FC = () => {
  const id = useParams<{ id: string }>().id;

  // Implement: load data using an API hook
  const data: Wumpus = {
    id: 1,
    firstName: 'Daffy',
    lastName: 'Duck',
    phone: '5555555555',
    businessPhone: '55555555555555',
    email: 'daffyduck@threefivetwo.com',
    zip: '90210',
    profilePhoto: 'http://placekitten.com/200/200',
    bio: 'I am a duck',
    color: 'red',
    pet: 'dog',
    location1: { id: 0, name: 'Town Center' },
    percent: 35.2,
    price: 35.2,
    isActive: true,
    agreedToTerms: true,
    deadline: new Date(),
    eventDates: [new Date(), new Date()],
  };

  if (!data) return null;

  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.wumpusEdit()} />
      <EditForm originalData={data} />
    </React.Fragment>
  );
};

export default EditWumpusPage;

'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

export default function AlertDialogBox(
  props : {
    title:string,
    description:string,
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    continueAction : Function,
    buttonName:string}) {
 
  return (
    <>
      <AlertDialog open={props.open} onOpenChange={props.setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{props.title}</AlertDialogTitle>
            <AlertDialogDescription>
             {props.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{props.buttonName ? 'Cancel' : 'Close'}</AlertDialogCancel>
            {
              props.buttonName && 
              <AlertDialogAction
                className='capitalize'
                onClick={() => props.continueAction()}
              >
                {props.buttonName}
              </AlertDialogAction>
            }
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

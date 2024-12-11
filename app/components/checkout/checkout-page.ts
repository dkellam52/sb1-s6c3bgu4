import { EventData, Page } from '@nativescript/core';
import { CheckoutViewModel } from './checkout-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new CheckoutViewModel();
}
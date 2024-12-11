import { EventData, Page } from '@nativescript/core';
import { MenuViewModel } from './menu-view-model';

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new MenuViewModel();
}
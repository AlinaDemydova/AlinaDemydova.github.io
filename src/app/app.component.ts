import { Component, OnInit, TemplateRef, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SECTION } from '../app/section-page/mock-section';
import { SectionTemplate } from './section-page/section-template';
import { SectionPageComponent } from './section-page/section-page.component';
import { SectionService } from './section-page/section.service';
import { AppService } from './app.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductService } from './product-page/product.service';
import { CartPageComponent } from './cart-page/cart-page.component';

@Component({
  providers: [CartPageComponent],
  inputs: ['countQuantitySum'],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent 
// implements OnInit 
{
  //@Input() countQuantitySum: number;
  title = 'NewProjectEasywalker';
  buggySection = SECTION;
  strollerSection = SECTION;
  modalRef: BsModalRef;
  sections: SectionTemplate; 
  totalChart: number;
  currentPage: string;
  viewCount: number;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: BsModalService,
    private sectionService: SectionService,
    private productService: ProductService,
    private appService: AppService,) { }

    ngOnInit(): void {
      this.getSectionBuggy();
      this.getSectionStroller();
      //this.cal();
      // this.getActive();
      // this.route.params.subscribe((params) => {console.log(params['id'])});
      this.activeMenu();
      this.router.events.subscribe((val) => { this.activeMenu() });

      this.productService.cartSubject.subscribe(x=> {
        if(x){
          this.viewCount = x;
        }
      })
    }

  // cal(){
  //   let productsInCart = JSON.parse(localStorage.getItem('obj'));
  //   // this.totalChart = 0;
  //   // arr.forEach(x => this.totalChart += x.quantity);
  //   this.countQuantitySum = 0;
  //   productsInCart.forEach(x => this.countQuantitySum += x.quantity);
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getSectionBuggy(): void {
    this.appService.getSectionBuggy().subscribe(buggySection => this.buggySection = buggySection);
  }
  getSectionStroller(): void {
    this.appService.getSectionStroller().subscribe(strollerSection => this.strollerSection = strollerSection);
  }

  activeMenu(): void {
    if (this.router.url.includes('/5')) {
      this.currentPage = 'stroller';
    } else if (this.router.url.includes('/6')) {
      this.currentPage = 'stroller';
    } else if (this.router.url.includes('/1')) {
      this.currentPage = 'buggy';
    } else if (this.router.url.includes('/2')) {
      this.currentPage = 'buggy';
    } else if (this.router.url.includes('/3')) {
      this.currentPage = 'buggy';
    } else if (this.router.url.includes('/accessorise')) {
      this.currentPage = 'accessorise';
    } else if (this.router.url.includes('/cart')) {
      this.currentPage = 'cart';
    } else {
      this.currentPage = 'main';
    }
    //console.log(this.router.url)
  }



 
}


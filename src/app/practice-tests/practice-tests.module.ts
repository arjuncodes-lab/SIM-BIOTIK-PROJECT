import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRACTICE_TESTS_ROUTES } from './practice-tests.routes';
 
@NgModule({
  imports: [
    RouterModule.forChild(PRACTICE_TESTS_ROUTES)
  ],
  exports: [RouterModule]
})

export class PracticeTestsModule {}

 
// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/pain-triggers/new" page={NewPainTriggerPage} name="newPainTrigger" />
      <Route path="/pain-triggers/{id:Int}/edit" page={EditPainTriggerPage} name="editPainTrigger" />
      <Route path="/pain-triggers/{id:Int}" page={PainTriggerPage} name="painTrigger" />
      <Route path="/pain-triggers" page={PainTriggersPage} name="painTriggers" />
      <Route path="/pain-types/new" page={NewPainTypePage} name="newPainType" />
      <Route path="/pain-types/{id:Int}/edit" page={EditPainTypePage} name="editPainType" />
      <Route path="/pain-types/{id:Int}" page={PainTypePage} name="painType" />
      <Route path="/pain-types" page={PainTypesPage} name="painTypes" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

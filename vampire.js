class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  includesObject(arr, obj) {
    for(const elm of arr) {
      // console.log(elm.name, obj.name)
      if (elm.name === obj.name) {
        return true;
      }
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampireNumFromOrigin = vampire.numberOfVampiresFromOriginal;
    let thisNumFromOrigin = this.numberOfVampiresFromOriginal;
    let thisAncestor = this;

    if (vampireNumFromOrigin === 0 || thisNumFromOrigin === 0) {
      return this.isMoreSeniorThan(vampire) ? this : vampire;
    } else if (vampireNumFromOrigin === 1 || thisNumFromOrigin === 1) {
      return this.isMoreSeniorThan(vampire) ? this.creator : vampire.creator;
    } else if (vampire === this) {
      return this;
    } else if (this.creator === vampire || vampire.creator === this) {
      return this.isMoreSeniorThan(vampire) ? this : vampire;
    }

    while (true) {
      if (vampireNumFromOrigin === thisNumFromOrigin) {
        if (this.includesObject(vampire.creator.offspring, thisAncestor)) {
          return vampire.creator;
        } else {
          vampire = vampire.creator;
          thisAncestor = thisAncestor.creator;
        }
      }else if (vampireNumFromOrigin > thisNumFromOrigin) {
        vampire = vampire.creator;
      } else if (thisNumFromOrigin > vampireNumFromOrigin) {
        thisAncestor = thisAncestor.creator;
      }
      vampireNumFromOrigin = vampire.numberOfVampiresFromOriginal;
      thisNumFromOrigin = thisAncestor.numberOfVampiresFromOriginal;
    }
  }
}

module.exports = Vampire;


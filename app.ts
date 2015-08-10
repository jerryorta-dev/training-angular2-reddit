/// <reference path="typings/angular2/angular2.d.ts" />
import {
    Component,
    View,
    bootstrap,
    NgFor
} from "angular2/angular2";

//Model
class Article {
    title:string;
    link:string;
    votes:number;

    constructor(title, link) {
        this.title = title;
        this.link = link;
        this.votes = 0;
    }

    voteUp():boolean {
        this.votes += 1;
        return false;
    }

    voteDown():boolean {
        this.votes -= 1;
        return false;
    }
}


@Component({
    selector: 'reddit-article'
})

@View({
    template: `
        <article>
            <div class="votes">{{ article.votes }}</div>
            <div class="main">
                <h2>
                    <a href="{{ article.link }}"> {{ article.title }}</a>
                </h2>
                <ul>
                    <li><a href (click)='article.voteUp()'>up vote</a></li>
                    <li><a href (click)='article.voteDown()'>down vote</a></li>
                </ul>
            </div>
        </article>
    `
})

    /**
     * Component Definition Class
     */
class RedditArticle {
    article:Article;

    constructor() {
        this.article = new Article('Angular 2', 'http://angular.io');
    }

}


//Reddit App

@Component({
    selector: 'reddit'
})

@View({
    directives: [NgFor, RedditArticle],
    template: `
        <section class="new-link">
            <div class="control-group">
                <div><labal for="title">Title:</labal></div>
                <div><input name="title" #newtitle /></div>
            </div>
            <div class="control-group">
                <div><label for="link">Link:</label></div>
                <div><input name="link" #newlink /></div>
            </div>
            <button (click)="addArticle(newtitle, newlink)">Submit Link</button>
        </section>

        <reddit-article></reddit-article>
    `
})

    /**
     * Component Definition Class
     */
class RedditApp {

    articles:Array<Article>;

    constructor() {
        this.articles = [
            new Article('Angular 2', 'http;//angular.io'),
            new Article('Fullstack', 'http://fullstack.io')
        ]
    }

    addArticle(title, link) {
        console.log("Adding article with title ", title.value, " and link ", link.value);
    }
}
bootstrap(RedditApp);
package app.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(app.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(app.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(app.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(app.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.Teacher.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(app.domain.TeacherDocument.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.Document.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.Document.class.getName() + ".documents", jcacheConfiguration);
            cm.createCache(app.domain.Document.class.getName() + ".documentTypes", jcacheConfiguration);
            cm.createCache(app.domain.DocumentType.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.DocumentType.class.getName() + ".documents", jcacheConfiguration);
            cm.createCache(app.domain.Notification.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.NotificationType.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.HeadQuater.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.CriteriaType.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.Answer.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.FullEvaluate.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.CriteriaEvaluate.class.getName(), jcacheConfiguration);
            cm.createCache(app.domain.DocumentType.class.getName() + ".notifications", jcacheConfiguration);
            cm.createCache(app.domain.Notification.class.getName() + ".documentTypes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
